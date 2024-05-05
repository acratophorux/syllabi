"use client";

import { Message, useAssistant } from "ai/react";
// import { ThemeProvider } from "next-themes";

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "black",
  data: "orange",
  tool: "",
};
export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/assistant" });

  return (
    <main className="flex flex-col items-center px-4 py-6 min-h-screen h-full">
      <p className="text-3xl font-bold pb-4 text-gray-700">
        Hey there, I am Syllabi.
      </p>
      <p className="text-gray-600 max-w-md">
        I am helpful assistant who can generate course objectives, syllabus
        outlines, measurable learning outcomes, assessment methods, and
        recommended readings for academic subjects and topics.
      </p>

      <div>
        {/* {messages.map((m: Message) => (
          <div key={m.id}>
            <strong>{`${m.role}: `}</strong>
            {m.role !== "data" && m.content}
            {m.role === "data" && (
              <>
                {(m.data as any).description}
                <br />
                <pre className={"bg-gray-200"}>
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
          </div>
        ))}

        {status === "in_progress" && <div />} */}
        <div className="flex flex-col gap-4 w-full max-w-4xl py-24 mx-auto stretch">
          {messages.map((m: Message) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap flex flex-col   ${
                m.role === "user"
                  ? "rounded-lg shadow-lg items-start text-right pt-4 pl-4 dark:bg-gray-600"
                  : "gap-1"
              }`}
              style={{ color: roleToColorMap[m.role] }}
            >
              <div
                className={` text-white  px-4 w-32 max-w-fit max-h-fit rounded-full flex flex-col justify-center items-center ${
                  m.role === "user"
                    ? "bg-black dark:bg-white dark:text-black"
                    : "bg-gradient-to-br from-amber-300 via-red-500 to-blue-500"
                }`}
              >
                <strong>{`${m.role === "user" ? "User" : "AIChef"}`}</strong>
              </div>
              <div className="text-black dark:text-gray-200">
                {m.role !== "data" && m.content}
              </div>
              {m.role === "data" && (
                <>
                  {/* here you would provide a custom display for your app-specific data:*/}
                  {(m.data as any).description}
                  <br />
                  <pre className={"bg-gray-200"}>
                    {JSON.stringify(m.data, null, 2)}
                  </pre>
                </>
              )}
              <br />
              <br />
            </div>
          ))}

          {status === "in_progress" && (
            <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
          )}
        </div>
        <div className="fixed left-0 bottom-0 flex items-center justify-center w-full  mb-3  px-1">
          <form
            onSubmit={submitMessage}
            className="h-12 p-1 flex flex-row text-black dark:text-white ring-2 ring-gray-600 dark:ring-gray-200 rounded-full backdrop-blur-lg "
          >
            <input
              disabled={status !== "awaiting_message"}
              value={input}
              placeholder="What do you want to learn?"
              className="w-full h-full rounded-full px-4 bg-gray-200 dark:bg-gray-600"
              onChange={handleInputChange}
            />
            <button
              className="bg-gray-800 dark:bg-gray-100 text-white dark:text-black rounded-full px-3 ml-3"
              type="submit"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
