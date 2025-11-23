"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const VCUID = process.env.NEXT_PUBLIC_VERIFY_VCUID || "";  

const LoginSchema = z.object({
  account: z.string().min(1, "帳號為必填"),
  password: z.string().min(1, "密碼為必填"),
});

type event = {
  id: string;
  artist: string;
  name: string;
  venue: string;
  venueAddress: string;
  eventTime: string;
  description: string;
};

type ticketResult = {
  data:[
    {
      claims:[
        {ename:"id_number", value:""},
        {ename:"name", value:""},
      ]
    },
    {
      claims:[
        {ename:"name", value:""},
        {ename:"ticket_number", value:""},
        {ename:"id_number", value:""},
        {ename:"artist", value:""},
        {ename:"price", value:""},
        {ename:"event_time", value:""},
        {ename:"event_venue", value:""},
        {ename:"ticket_type", value:""},
        {ename:"seat", value:""},
      ]
    }
  ]
}

export type LoginFormData = z.infer<typeof LoginSchema>;

interface TicketInfo {
  name: string;
  ticket_number: string;
  id_number: string;
  artist: string;
  price: string;
  event_time: string;
  event_venue: string;
  ticket_type: string;
  seat: string;
}

const STEP = {
  LOGIN: "LOGIN",
  VERIFICATION: "VERIFICATION",
};

const stateEnum = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
};

export default function VerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<string>(STEP.LOGIN);
  const [allEvent, setAllEvent] = useState<event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [qrcodeImage, setQrcodeImage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [match, setMatch] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState(stateEnum.SINGLE);
  const [ticketHistory, setTicketHistory] = useState<TicketInfo[]>([]);
  const [ticketData, setTicketData] = useState({
    name: "",
    ticket_number: "",
    id_number: "",
    artist: "",
    price: "",
    event_time: "",
    event_venue: "",
    ticket_type: "",
    seat: "",
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const fetchEvents = async () => {
    try {
      setAllEvent([{
        "id": "5",
        "artist": "TWICE",
        "name": "TWICE <THIS IS FOR> WORLD TOUR",
        "venue": "高雄國家體育場",
        "venueAddress": "高雄國家體育場",
        "description": "TWICE <THIS IS FOR> WORLD TOUR",
        "eventTime": "2025-11-22T19:00:00.000Z"
    }])
    } catch (error) {
      console.error("獲取活動列表失敗", error);
    }
  };

  const generateVerify = async () => {
    const UID = await crypto.randomUUID();
    
    const res = await fetch(`/api/oidvp/qrcode?ref=${VCUID}&transactionId=${UID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    setTransactionId(UID);
    await res.json().then((data)=>{
      setQrcodeImage(data.qrcodeImage)
    })
  };

  useEffect(() => {

    generateVerify();
    fetchEvents();
  }, []);

  const showData = async() =>{
    const res = await fetch("/api/oidvp/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        transactionId: transactionId
      })
    });
    await res.json().then((data:ticketResult)=>{
      const temp = ticketData;
      if(data.data){
        data.data[1].claims.map((data)=>{
          const key = data.ename
          temp[key] = data.value
        })
        data.data[0].claims.map((data)=>{
          const key = data.ename
          if(temp[key] != data.value){
            setMatch(false)
            setError(error + key + ":" + temp[key] + "與" + data.value + "不符合");
          }
        })
        let tempH = ticketHistory;
        tempH.push(temp)
        setTicketHistory(tempH);
        setTicketData(temp);
        generateVerify();
        router.refresh()
      }
    })
  }

  const normalizeQrSrc = (value?: string) => {
    if (!value) return "";
    if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:"))
      return value;
    return `data:image/png;base64,${value}`;
  };

  const handleEventSelect = async (eventId: string) => {
    setSelectedEvent(eventId);
  };

  const handleLogin = () => {
    setStep(STEP.VERIFICATION);
  };

  const updateData = () => {
    showData()
    setState(stateEnum.MULTIPLE);
  };

  const openSingleData = (info: TicketInfo) => {
    setTicketData(info);
    setState(stateEnum.SINGLE);
  };

  return (
    <>
      <div className="min-h-screen bg-background p-6">
        {step === STEP.LOGIN && (
          <>
            <div className="max-w-lg mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">登入</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-center space-y-8">
                  <div className="space-y-4 mb-2">
                    <Label htmlFor="account">帳號</Label>
                    <Input
                      id="account"
                      type="text"
                      placeholder="請輸入帳號"
                      {...register("account")}
                    />
                    {errors.account && (
                      <p className="text-sm text-red-500">
                        {errors.account.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4 mb-2">
                    <Label htmlFor="password">密碼</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="請輸入密碼"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="mt-[4rem]"
                    onClick={handleSubmit(handleLogin)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "登入"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        {step === STEP.VERIFICATION && (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 頁面標題 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">
                  QR Code 驗證
                </h1>
                <p className="text-muted-foreground">管理 QR Code 驗證系統</p>
              </div>
            </div>

            {/* 活動選擇下拉選單 */}
            <Card>
              <CardHeader>
                <CardTitle>選擇活動</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="event-select">活動</Label>
                  <Select
                    value={selectedEvent}
                    onValueChange={handleEventSelect}
                  >
                    <SelectTrigger id="event-select">
                      <SelectValue placeholder="請選擇活動" />
                    </SelectTrigger>
                    <SelectContent>
                      {allEvent.map((event: any) => (
                        <SelectItem key={event.id} value={event.id} className="bg-white">
                          {event.artist} - {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 左側為Qrcode顯示區，右側為該活動資訊區 */}
            {selectedEvent && ticketData && (
              <div className="grid grid-cols-12 gap-4 h-full">
                {/* 左側QR Code顯示區 */}
                <div className="flex flex-col gap-4 col-span-12 md:col-span-4 h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        驗證 QR Code
                        <Button
                          variant="default"
                          size="sm"
                          onClick={updateData}
                        >
                          更新資料
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center space-y-4">
                      {ticketData && (
                        <Image
                          src={normalizeQrSrc(qrcodeImage)}
                          alt="QR Code"
                          className="h-80 w-80 rounded-lg border"
                          width={64}
                          height={64}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
                {/* 右側為該活動資訊區 */}
                <div className="relative flex flex-col gap-4 col-span-12 md:col-span-8 h-full ">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        活動資訊
                      </CardTitle>
                    </CardHeader>
                    {state === stateEnum.SINGLE ? (
                    <CardContent className="space-y-4">
                      {ticketData.name!="" && <div>
                        {match?<p style={{ color: 'green' }}>✔ 資訊驗證成功</p>
                        :<p style={{ color: 'red' }}>✘ 資訊驗證失敗 原因:{error}</p>}
                      </div>}
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          身分字號
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.id_number}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          姓名
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.name}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          票種
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.ticket_type}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          座位
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.seat == "-"?"本活動無座位":ticketData.seat}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          表演團體
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.artist}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          活動場地
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.event_venue}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          活動時間
                        </Label>
                        <p className="text-lg font-semibold">
                          {ticketData.event_time}
                        </p>
                      </div>
                    </CardContent>
                  ) : (
                      <Table className="w-full p-8">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-start">
                              身分字號
                            </TableHead>
                            <TableHead className="text-center">
                              姓名
                            </TableHead>
                            <TableHead className="text-center">
                              票券種類
                            </TableHead>
                            <TableHead className="text-end">座位號碼</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ticketHistory.map((data, index) => (
                            <TableRow
                              key={index}
                              onClick={() => openSingleData(data)}
                              className="cursor-pointer hover:bg-muted/50"
                            >
                              <TableCell className="text-start">
                                {data.id_number}
                              </TableCell>
                              <TableCell className="text-center">
                                {data.name}
                              </TableCell>
                              <TableCell className="text-center">
                                {data.ticket_type}
                              </TableCell>
                              <TableCell className="text-end">
                                {data.seat}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
