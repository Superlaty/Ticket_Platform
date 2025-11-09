import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type UserInfo = {
  name: string;
  phone: string;
  idNumber: string;
  birthday?: string; // YYYY-MM-DD
};

export type UserInfoModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (data: UserInfo) => void;
  defaultValues?: Partial<UserInfo>;
};

// 台灣常見格式驗證（可依需求調整）
const phoneRegex = /^09\d{8}$/; // 09 開頭 + 8 碼
const idRegex = /^[A-Z][12]\d{8}$/; // 首字母 + 1/2 + 8 碼

export default function UserInfoModal({
  open,
  title = "填寫資料",
  onClose,
  onSubmit,
  defaultValues,
}: UserInfoModalProps) {
  // 第一個視窗的資料
  const [values, setValues] = useState<UserInfo>({
    name: "",
    phone: "",
    idNumber: "",
    birthday: "",
  });

  const [touched, setTouched] = useState<Record<keyof UserInfo, boolean>>({
    name: false,
    phone: false,
    idNumber: false,
    birthday: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserInfo, string>>
  >({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // NEW: 控制第二個小視窗（第二個畫面）
  const [showResultModal, setShowResultModal] = useState(false);

  const [qrcode, setQrcode] = useState("");

  // 開啟時聚焦第一個欄位
  useEffect(() => {
    if (open && !showResultModal) {
      setTimeout(() => nameInputRef.current?.focus(), 0);
    }
  }, [open, showResultModal]);

  // 開啟時或 defaultValues 改變時，重設表單狀態
  useEffect(() => {
    if (open) {
      setValues({
        name: defaultValues?.name ?? "",
        phone: defaultValues?.phone ?? "",
        idNumber: defaultValues?.idNumber ?? "",
        birthday: defaultValues?.birthday ?? "",
      });
      setTouched({
        name: false,
        phone: false,
        idNumber: false,
        birthday: false,
      });
      setErrors({});
      setShowResultModal(false); // 每次重新開啟時回到第一步
    }
  }, [open, defaultValues]);

  function validate(v: UserInfo) {
    const e: Partial<Record<keyof UserInfo, string>> = {};

    if (!v.name.trim()) e.name = "請輸入姓名";
    if (!v.phone.trim()) e.phone = "請輸入手機號碼";
    else if (!phoneRegex.test(v.phone))
      e.phone = "手機號碼格式錯誤（需 09 開頭，共 10 碼）";

    if (!v.idNumber.trim()) e.idNumber = "請輸入身分證號";
    else if (!idRegex.test(v.idNumber.toUpperCase()))
      e.idNumber = "身分證格式錯誤";

    // birthday 選填，若有填則檢查 YYYY-MM-DD
    if (v.birthday && Number.isNaN(Date.parse(v.birthday))) {
      e.birthday = "生日格式錯誤（YYYY-MM-DD）";
    }
    return e;
  }

  function handleChange<K extends keyof UserInfo>(key: K, val: UserInfo[K]) {
    const next = { ...values, [key]: val } as UserInfo;
    setValues(next);
    if (touched[key]) {
      setErrors(() => ({ ...validate(next) }));
    }
  }

  function handleBlur<K extends keyof UserInfo>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(() => ({ ...validate(values) }));
  }

  const normalizeQrSrc = (value?: string) => {
    if (!value) return "";
    if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:"))
      return value;
    return `data:image/png;base64,${value}`;
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    const requestBody = {
      fields: [
        {
          ename: "id_number",
          content: values.idNumber
        },
        {
          ename: "id_card_serial_number",
          content: "00000000001"
        },
        {
          ename: "name",
          content: values.name
        },
        {
          ename: "roc_birthday",
          content: values.birthday==""?"1110827":values.birthday
        },
        {
          ename: "registered_address",
          content: "100臺北市中正區延平南路143號"
        }        
      ]
    };

    async function fetchData() {
      const res = await fetch("/api/qrcode/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      await res.json().then((data)=>{
        setQrcode(data.qrCode);
      })
    }
    fetchData();
    
    // 不立刻 onClose，而是顯示第二個視窗
    setShowResultModal(true);
  }

  // Esc 關閉（如果在第二個視窗也按 Esc，就直接整個關掉）
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && (open || showResultModal)) {
        handleFinalClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, showResultModal]);

  // NEW: 第二個視窗關閉的統一處理
  function handleFinalClose() {
    setShowResultModal(false);
    const eMap = validate(values);
    setErrors(eMap);

    // 若無錯誤才送出
    if (Object.keys(eMap).length === 0) {
      const payload: UserInfo = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        idNumber: values.idNumber.trim().toUpperCase(),
        birthday: values.birthday ? values.birthday : undefined,
      };

      onSubmit(payload);
    }
    onClose();
  }

  // 如果完全關閉（沒有任何畫面要顯示），就不 render
  if (!open && !showResultModal) return null;

  return (
    <div
      ref={dialogRef}
      aria-modal
      role="dialog"
      aria-labelledby="user-info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/40" onClick={handleFinalClose} />

      {/* 內容卡片 */}
      <div className="relative w-[92vw] max-w-md rounded-2xl bg-white p-5 shadow-xl">
        {!showResultModal ? (
          <>
            <h2 id="user-info-modal-title" className="text-xl font-semibold">
              {title}
            </h2>
            <form onSubmit={submit} className="mt-4 space-y-3">
              {/* 姓名 */}
              <div>
                <label className="mb-1 block text-sm font-medium">姓名 *</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="請輸入姓名"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* 手機 */}
              <div>
                <label className="mb-1 block text-sm font-medium">手機 *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={values.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="例如：0912345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* 身分證 */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  身分證 *
                </label>
                <input
                  type="text"
                  value={values.idNumber}
                  onChange={(e) => handleChange("idNumber", e.target.value)}
                  onBlur={() => handleBlur("idNumber")}
                  className={`w-full rounded-xl border px-3 py-2 uppercase outline-none focus:ring-2 ${
                    errors.idNumber
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="例如：A123456789"
                />
                {errors.idNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.idNumber}
                  </p>
                )}
              </div>

              {/* 生日（選填） */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  生日（選填）
                </label>
                <input
                  type="date"
                  value={values.birthday ?? ""}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                  onBlur={() => handleBlur("birthday")}
                  className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
                    errors.birthday
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birthday}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleFinalClose}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  送出
                </button>
              </div>
            </form>
          </>
        ) : (
           <div className="flex flex-col items-center text-center space-y-4">
            {/* 最上方：置中大圖片 */}
            <Image
              src={qrcode==""?"/logo.jpg":normalizeQrSrc(qrcode)} // TODO: 換成你的圖片路徑
              alt="完成提示"
              className="h-28 w-auto object-contain"
              height={256}
              width={256}
            />
            <div>
              <p className="text-sm text-gray-600">
                請使用數位憑證皮夾APP掃描上方QRCODE
              </p>
              <p className="text-sm text-gray-600">
                未安裝APP請點選下方進行安裝
              </p>
            </div>

            {/* 中間：兩張圖片一左一右 */}
            <div className="mt-2 grid w-full grid-cols-2 gap-3">
              <div className="flex justify-center">
                <Image
                  src="/androidQrcode.png" // TODO
                  alt="左側圖片"
                  className="h-20 w-auto object-contain"
                  height={256}
                  width={256}
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/iosQrcode.png" // TODO
                  alt="右側圖片"
                  className="h-20 w-auto object-contain"
                  height={256}
                  width={256}
                />
              </div>
            </div>

            {/* 下方：兩個可以點擊的圖片連結（可視為照片按鈕） */}
            <div className="mt-1 grid w-full grid-cols-2 gap-3">
              {/* 左邊圖片 + 連結 */}
              <a
                href="https://play.google.com/apps/testing/tw.gov.moda.diw" // TODO: 左邊連結
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <Image
                  src="/googleplay.png" // TODO: 左邊可點擊照片
                  alt="前往左側頁面"
                  className="h-16 w-auto rounded-lg object-cover shadow-sm"
                  height={256}
                  width={256}
                />
              </a>

              {/* 右邊圖片 + 連結 */}
              <a
                href="https://testflight.apple.com/join/gxr3mQFj" // TODO: 右邊連結
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <Image
                  src="/applestore.png" // TODO: 右邊可點擊照片
                  alt="前往右側頁面"
                  className="h-16 w-auto rounded-lg object-cover shadow-sm"
                  height={256}
                  width={256}
                />
              </a>
            </div>

            {/* 最下面：關閉視窗按鈕 */}
            <button
              type="button"
              onClick={handleFinalClose}
              className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              已領取模擬身分證
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
