defmodule PhxChat.Repo.Migrations.UpdateMessagesTable do
  use Ecto.Migration

  def change do
    rename table(:messages), :channel_id, to: :chat_channel_id
  end
end
