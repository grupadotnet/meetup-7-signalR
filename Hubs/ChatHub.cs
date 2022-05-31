using Microsoft.AspNetCore.SignalR;

namespace meet_up_7.Hubs;

public class ChatHub : Hub<IChatClient>
{
    public async Task SendMessage(ChatMessage message)
    {
        await Clients.All.ReceiveMessage(message);
    }
}

public class ChatMessage
{
    public string User { get; set; }

    public string Message { get; set; }

    public DateTime Date { get; set; }
}