defmodule PhxChat.Repo.Migrations.CreateMessageViewEvents do
  use Ecto.Migration

  def change do
    create table(:message_view_events) do
      add :message_id, :integer
      add :user_id, :integer
      add :chat_channel_id, :integer

      timestamps()
    end

  end
end
