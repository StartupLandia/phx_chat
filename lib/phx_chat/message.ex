defmodule PhxChat.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhxChat.Message


  schema "messages" do
    field :body, :string

    belongs_to :user, PhxChat.User
    belongs_to :chat_channel, PhxChat.ChatChannel

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:body, :chat_channel_id, :user_id])
    |> validate_required([:body, :chat_channel_id, :user_id])
  end
end
