defmodule PhxChat.MessageViewEvent do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhxChat.MessageViewEvent

  schema "message_view_events" do
    field :chat_channel_id, :integer
    field :message_id, :integer
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(message_view_event, attrs) do
    message_view_event
    |> cast(attrs, [:message_id, :user_id, :chat_channel_id])
    |> validate_required([:message_id, :user_id, :chat_channel_id])
  end

  def record_first_occurence(message_id, user_id, chat_channel_id) do
    opts = %{message_id: message_id, user_id: user_id, chat_channel_id: chat_channel_id}
    if ! PhxChat.Repo.get_by(MessageViewEvent, opts) do
      changeset = PhxChat.MessageViewEvent.changeset(%PhxChat.MessageViewEvent{}, opts)
      PhxChat.Repo.insert(changeset)
    else
      IO.puts('record exists, no further action your honor')
    end
  end
end
