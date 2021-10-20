const insertBox = document.querySelector("#insert_box") as HTMLInputElement;

const reqMessage = async (content: string) => {
  const reqOption: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  };
  return fetch("/api", reqOption);
};

const resMessage = async () => {
  return fetch("/api")
    .then(async (res) => {
      console.log(res.status);
      const content = await res.json();
      console.log(content);
      const element = document.createElement("div");
      element.innerText = content.content;
      document.querySelector("body")?.prepend(element);
      console.log("받음");
      await resMessage();
    })
    .catch((err) =>
      setTimeout((_) => {
        console.log(err);
        resMessage();
      }, 5000)
    );
};

const handleSubmit = async (event: any) => {
  const convertEvent = event as KeyboardEvent;
  if (convertEvent.key === "Enter") {
    reqMessage(insertBox.value)
      .then(async (res) => {
        console.log("성공");
      })
      .catch((err) => console.error(err));
  }
};

resMessage();

insertBox?.addEventListener("keydown", handleSubmit);
