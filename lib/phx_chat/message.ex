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

  def create_en_masse(user_id) do
    channel_id = PhxChat.Repo.get_by(PhxChat.ChatChannel, user_id: user_id).id
    Enum.map(Enum.to_list(1..1000), fn y ->
      message = "I've just placed puzzle piece #{y}"
      changeset = PhxChat.Message.changeset(%PhxChat.Message{}, %{user_id: user_id, body: message, chat_channel_id: channel_id})
      PhxChat.Repo.insert(changeset)
    end)
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:body, :chat_channel_id, :user_id])
    |> validate_required([:body, :chat_channel_id, :user_id])
  end
end
