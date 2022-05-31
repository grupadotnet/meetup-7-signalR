namespace meet_up_7.Hubs;

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
}