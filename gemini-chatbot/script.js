const messageLog = document.getElementById("message-log");
const composerForm = document.getElementById("composer-form");
const userInput = document.getElementById("user-input");
const messageTemplate = document.getElementById("message-template");

const MODEL_NAME = "gemini-2.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const API_KEY = "AIzaSyAuy5ABfduA-MOWXasx4TAswNTRsX_YmL4"

const transcript = [];

function appendMessage(role, content) {
  const fragment = messageTemplate.content.cloneNode(true);
  const li = fragment.querySelector(".message");
  li.dataset.role = role;
  fragment.querySelector(".message-role").textContent = role === "assistant" ? "Gemini" : "You";
  fragment.querySelector(".message-text").textContent = content;
  messageLog.append(li);
  messageLog.scrollTop = messageLog.scrollHeight;
  return li;
}

function setComposerDisabled(disabled) {
  userInput.disabled = disabled;
  composerForm.querySelector("button[type='submit']").disabled = disabled;
}

function buildPayload() {
  const contents = transcript.map(entry => ({
    role: entry.role === "assistant" ? "model" : "user",
    parts: [{ text: entry.content }]
  }));

  if (contents.length === 0) {
    throw new Error("Conversation is empty");
  }

  return { contents };
}

async function callModel() {
  if (!API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  const url = `${API_BASE}/${MODEL_NAME}:generateContent?key=${encodeURIComponent(API_KEY)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildPayload())
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const candidates = data.candidates;
  const parts = candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts) || parts.length === 0) {
    throw new Error("No text returned by model");
  }

  const text = parts
    .map(part => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return text || "(Empty response)";
}

composerForm.addEventListener("submit", async event => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  userInput.value = "";
  transcript.push({ role: "user", content: message });
  appendMessage("user", message);
  const thinking = appendMessage("assistant", "...");
  setComposerDisabled(true);

  try {
    const reply = await callModel();
    transcript.push({ role: "assistant", content: reply });
    thinking.querySelector(".message-text").textContent = reply;
  } catch (error) {
    thinking.querySelector(".message-text").textContent = `Error: ${error.message}`;
  } finally {
    setComposerDisabled(false);
    userInput.focus();
  }
});

userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = `${Math.min(userInput.scrollHeight, 200)}px`;
});

if (!API_KEY) {
  appendMessage("assistant", "Set the GEMINI_API_KEY environment variable before chatting.");
  setComposerDisabled(true);
} else {
  appendMessage("assistant", "Hey there! I am ready to chat with Gemini 2.5 Flash.");
}
