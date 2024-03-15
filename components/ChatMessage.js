import {useEffect} from "react";

export const ChatMessage = ({index, senderMessage, botReply,dateTimeStamp}) => {
    useEffect(() =>{
        console.log(botReply)
    }, [])
    const formatDateTime = (dateTimeStamp) => {
        const date = new Date(dateTimeStamp);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    return (
        <>

            <div key={index} className="chat-message self-end">
                        <p style={{backgroundColor: '#EEEEEE', color: 'black'}}
                              className={`px-4 py-2 rounded-lg inline-block my-4 w-full md:max-w-full`}>
                            {senderMessage}
                            <br/>
                            <span className="text-end justify-end flex text-black">{
                                formatDateTime(dateTimeStamp)
                            }</span>
                        </p>

            </div>
            <div style={{backgroundColor: '#099696', color: 'white'}} dangerouslySetInnerHTML={{__html: botReply}} key={index} className="chat-message text-white px-4 py-2 rounded self-start">
            </div>

        </>
    );
}
