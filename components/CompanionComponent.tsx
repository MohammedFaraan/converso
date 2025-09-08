"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  name,
  topic,
  subject,
  style,
  voice,
  companionId,
  userName,
  userImage,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onError = (error: Error) => console.log("Error", error);

    const onSpeechStart = () => setIsSpeaking(true);

    const onSpeechEnd = () => setIsSpeaking(false);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.INACTIVE);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh] w-full">
      <section className="flex gap-8 max-sm:flex-col mb-6">
        <div className="w-2/3 max-sm:w-full rounded-xl border border-border dark:border-gray-300 p-6 bg-card/80 dark:bg-card/80 shadow-sm transition-all duration-200">
          <div
            className="relative size-[300px] max-sm:size-[150px] flex items-center justify-center rounded-xl mx-auto mb-4 overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                height={150}
                width={150}
                className="max-sm:w-[80px] max-sm:h-[80px] transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="size-[300px] max-sm:size-[150px]"
              />
            </div>
          </div>
          <p className="font-bold text-2xl text-center dark:text-white/90 mb-2">{topic}</p>
        </div>
        <div className="w-1/3 max-sm:w-full flex flex-col gap-4">
          <div className="rounded-xl border border-border dark:border-gray-300 p-6 bg-card/80 dark:bg-card/80 shadow-sm transition-all duration-200">
            <div className="flex flex-col items-center gap-4">
              <div className="relative overflow-hidden rounded-lg border-2 border-border dark:border-gray-300 p-1">
                <Image
                  src={userImage}
                  alt={userName}
                  height={130}
                  width={130}
                  className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="font-bold text-xl dark:text-white/90">{userName}</p>
            </div>
          </div>
          <button
            className="rounded-xl border border-border dark:border-gray-300 p-4 bg-card/80 dark:bg-card/80 shadow-sm flex items-center justify-center gap-3 hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
            aria-label={isMuted ? "Turn on microphone" : "Turn off microphone"}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              height={28}
              width={28}
              className="transition-transform duration-200 hover:scale-105"
            />
            <p className="max-sm:hidden dark:text-white/90">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-xl py-3 w-full cursor-pointer font-medium transition-all duration-200 shadow-sm",
              callStatus === CallStatus.ACTIVE 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-primary hover:bg-primary/90 text-white dark:bg-primary/90 dark:hover:bg-primary/80 dark:text-black",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>

      <section className="relative flex-grow overflow-hidden rounded-xl border border-border dark:border-gray-300 bg-card/80 dark:bg-card/80 shadow-sm">
        <div className="h-full overflow-y-auto px-6 py-4 no-scrollbar">
          {messages.length > 0 ? (
            <div className="flex flex-col gap-4 max-sm:gap-3">
              {messages.map((message, index) => {
                if (message.role === "assistant") {
                  return (
                    <p key={index} className="text-xl max-sm:text-base dark:text-white/90 break-words">
                      <span className="font-semibold">{name.split(" ")[0].replace(/[.,]/g, "")}:</span>{" "}
                      {message.content}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-xl max-sm:text-base text-primary dark:text-primary/90 break-words">
                      <span className="font-semibold">{userName}:</span>{" "}
                      {message.content}
                    </p>
                  );
                }
              })}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground dark:text-muted-foreground/70 text-lg text-center">
                Start a session to begin your conversation
              </p>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-card via-card/90 to-transparent dark:from-card dark:via-card/90 dark:to-transparent"></div>
      </section>
    </section>
  );
};

export default CompanionComponent;
