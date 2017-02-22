# CHAT Publicly Websockets API

- Integration with data access modules of the system
  - User
    Find user by name
    Update user (for changing status online / offline)
  - Message
    Create message
    Find messages by Receiver user (must be able to retrieve messages that do not have receivers and treat them as public)


- WebSockets events
   `Connect`
        Parameters: @user_id
        Description: Connection event, to register a client frontend to the websockets server
   `Disconnect`
        Parameters: @user_id
        Description: Disconnect event, to unregister a cliente frontend to the websockets server
    `user-list-changed`
       Parameters: @none
       Description: broadcast event when any other user logs in or out
    `messages-broadcast`
        Parameters: @message (object)
        Description: broadcast event when a new public message is available

## Architectural decision
    if message is public, it should be broadcasted to everyone that is registered to listen to the websocket, otherwise the event messages-broadcast should not be triggered. This will probably be important in the future when we need to implement 

