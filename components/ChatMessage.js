export const ChatMessage = ({index, senderMessage, botReply}) => {
    return (
        <>

            <div key={index} className="chat-message self-end">
                        <span style={{backgroundColor: '#EEEEEE', color: 'black'}}
                              className={`px-4 py-2 rounded-lg inline-block my-4 w-full md:max-w-full`}>
                            {senderMessage}
                        </span>
            </div>
            <div key={index} className="chat-message self-start">
                        <span style={{backgroundColor: '#057e7e', color: 'white'}}
                              className={`px-4 py-2 rounded-lg inline-block text-gray-900 md:max-w-full`}>
                            {botReply}
                        </span>
            </div>

        </>
    );
}
