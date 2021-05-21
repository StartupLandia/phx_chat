require IEx
import Ecto.Query

defmodule PhxChatWeb.ChatChannelsController do
  use PhxChatWeb, :controller

  def show(conn, _params) do
    users = Enum.map(PhxChat.Repo.all(PhxChat.User), fn x -> [x.name, x.id] end)
    channel = PhxChat.Repo.get(PhxChat.ChatChannel, conn.params["id"])
      |> PhxChat.Repo.preload([messages: { from(m in PhxChat.Message, order_by: [desc: m.id], limit: 1000), [:user] }])
    messages = Enum.map(channel.messages, fn m -> %{body: m.body, id: m.id, inserted_at: m.inserted_at, inserted_by: m.user.name} end)
    last_viewed_message_id = PhxChat.MessageViewEvent.last_viewed_message_id(String.to_integer(conn.params["currentUserId"]), String.to_integer(conn.params["id"]))
    render(conn, "show.html", channel: channel, users: users, messages: messages, last_viewed_message_id: last_viewed_message_id)
  end
end
