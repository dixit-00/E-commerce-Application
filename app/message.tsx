import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";

type MessageProps = {
  text: string;
  sender: "user" | "bot";
};

const Message = ({ text, sender }: MessageProps) => {
  return (
    <View
      style={[
        styles.messageContainer,
        sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

type ChatProps = {};

const Chatbot = (props: ChatProps) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const lockDuration = 5000; // 5 seconds delay before another message can be sent
    const lockTimer = setTimeout(() => setIsLocked(false), lockDuration);
    return () => clearTimeout(lockTimer);
  }, [isLocked]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: MessageProps = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      if (isLocked) {
        Alert.alert(
          "API Locked",
          "Please wait a moment before sending another message."
        );
        return;
      }

      setIsLocked(true);
      setTimeout(() => handleBotResponse(input), 1000);
    }
  };

  const handleBotResponse = (userInput: string) => {
    let botReply = "I'm here to assist with your shopping needs!";

    if (userInput.toLowerCase().includes("hello")) {
      botReply = "Hello! How can I assist you with your shopping today?";
    } else if (userInput.toLowerCase().includes("order status")) {
      botReply = "Can you please provide your order number?";
    } else if (userInput.toLowerCase().includes("refund")) {
      botReply =
        "Sure! Please provide your order number so I can assist you with the refund process.";
    } else if (userInput.toLowerCase().includes("discount")) {
      botReply =
        "We currently have discounts on selected products! Would you like me to show you the offers?";
    } else if (userInput.toLowerCase().includes("shipping")) {
      botReply =
        "Shipping usually takes 3-5 business days. Would you like to track your order?";
    } else if (userInput.toLowerCase().includes("product details")) {
      botReply =
        "I can help with that! Please tell me which product you're interested in.";
    } else if (userInput.toLowerCase().includes("help")) {
      botReply = "Sure! Let me know what you need assistance with!";
    } else if (
      userInput.toLowerCase().includes("thank you") ||
      userInput.toLowerCase().includes("thanks")
    ) {
      botReply =
        "You're welcome! If you have any more questions, feel free to ask!";
    } else {
      botReply =
        "I didn't quite understand. Can you please rephrase your question?";
    }

    const botMessage: MessageProps = { text: botReply, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message text={item.text} sender={item.sender} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messagesContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 7,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderColor: "#DDD",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#F1F3F4",
  },
});

export default Chatbot;
