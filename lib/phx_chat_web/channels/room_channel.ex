require Logger
require IEx

defmodule PhxChatWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:ok, _socket}
  end

  def handle_in("new_msg", %{"body" => body, "userId" => userId, "chatChannelId" => chatChannelId}, socket) do
    {:ok, message} = PhxChat.Repo.insert(%PhxChat.Message{user_id: userId, body: body, chat_channel_id: chatChannelId})
    broadcast!(socket, "new_msg", %{body: message.body, inserted_at: message.inserted_at, submitted_by: PhxChat.Repo.get(PhxChat.User,message.user_id).name })
    {:noreply, socket}
  end
end
