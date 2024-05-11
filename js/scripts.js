const scrollingElement = (document.scrollingElement || document.body);
var new_message_sound = new Audio("./audios/new_message_whatsapp_sound.mp3")
var first_exec = 1
var scroll_flag = 1
var next_message_id = 0
var messages_list = {
    "messages": [
        {
            "id": 0,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, "Hi dear costumer, how can I help you today?"]
            ],
            "next_node_id": 1
        },
        {
            "id": 1,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": "I need a bot for my company, but I didn't find a good one.",
                    "next_node_id": 2
                }
            ]
        },
        {
            "id": 2,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, "Oh, really?"]
            ],
            "next_node_id": 3
        },
        {
            "id": 3,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": "Yeah, I've spent 3 weeks searching a bot that could be used on my webpage",
                    "next_node_id": 4
                }
            ]
        },
        {
            "id": 4,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, "No need to worry my dear costumer, I'll help you out with this!"]
            ],
            "next_node_id": 5
        },
        {
            "id": 5,
            "type": 0,
            "content_type": 0,
            "content": [
                [1, "I will work for you!"]
            ],
            "next_node_id": 6
        },
        {
            "id": 6,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, `With me, you don't need to worry to implement a bot directly on Whatsapp
                    that would give you extra cost every month or even a phone number just for it. 
                    You can choose between Whatsapp or Instagram conversation themes,
                    also, a single webpage is enough. <strong>I'll</strong> lead your costumers
                    to the best experience they would have on your support`]
            ],
            "next_node_id": 7
        },
        {
            "id": 7,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, `I can be used with any conversation flux that you desire. I support:<br>
                    <strong>1. </strong> Messages<br>
                    <strong>2. </strong> Links<br>
                    <strong>3. </strong> Images<br>
                    <strong>4. </strong> Videos<br>
                    <strong>5. </strong> Audios`]
            ],
            "next_node_id": 8
        },
        {
            "id": 8,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": "Thats exactly what I need!",
                    "next_node_id": 9
                }
            ]
        },
        {
            "id": 9,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, `See the following examples:`]
            ],
            "next_node_id": 11
        }, 
        {
            "id": 11,
            "type": 0,
            "content_type": 2,
            "content": ["https://img.freepik.com/vetores-gratis/conceito-de-chatbot-messenger-com-ilustracao-isometrica-de-simbolos-de-opcoes-e-funcoes_1284-65144.jpg", "bot_img.jpg"],
            "next_node_id": 12
        },
        {
            "id": 12,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": `Nice, what about embedded videos?`,
                    "next_node_id": 13
                }
            ]
        },
        {
            "id": 13,
            "type": 0,
            "content_type": 0,
            "content": [
                [0, "Here it is!"]
            ],
            "next_node_id": 14
        },
        {
            "id": 14,
            "type": 0,
            "content_type": 3,
            "content": ["https://www.youtube.com/embed/uLgxjLMkRdY?si=kw3DxpopX2rMXD2x"],
            "next_node_id": 15
        },
        {
            "id": 15,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": "Nice, but, could you send me an audio?",
                    "next_node_id": 16
                }
            ],
        },
        {
            "id": 16,
            "type": 0,
            "content_type": 4,
            "content": ["message.mp3"],
            "next_node_id": 17
        },
        {
            "id": 17,
            "type": 1,
            "content_type": 0,
            "content": [
                {
                    "content": "Nice, got it! Now please, can you send me a link?",
                    "next_node_id": 18
                }
            ]
        },
        {
            "id": 18,
            "type": 0,
            "content_type": 1,
            "content": [
                [
                    [0, "You can count on me at anytime! Click on the link bellow to go to our main page"]
                ],
                "https://www.mywebsite.com/home"
            ]
        }
    ]
}


function createStringMessages(messages_array, message_type) {
    var message_string = ""
    if(messages_array)
    if(!message_type) {
        for (message of messages_array) {
            if (message[0])
                message_string += ` <strong>${message[1]}</strong> `
            else
                message_string += message[1]
        }
    }
    else {
        if(messages_array[0] !== null) {
            for (message of messages_array[0]) {
                if (message[0])
                    message_string += ` <strong>${message[1]}</strong> `
                else
                    message_string += message[1]
            }
            message_string += `</br><strong>link: <strong><span class="link"> ${messages_array[1]} </span>`
        }
        else
            message_string += `<strong>link: <strong><span class="link"> ${messages_array[1]} </span>`
    }
    return message_string
}

function searchMessage(id) {
    for (message of messages_list.messages)
        if (message.id == id)
            return message
    return 0
}

function callNextMessage(next_node_id, text) {
    const message_field = Array.from(document.querySelectorAll(".message-field")).pop()
    const user_message_div = document.createElement("div")
    const message_status_div = document.createElement("div")
    const message_status_span = document.createElement("span")
    const svg_img = document.createElement("img")

    user_message_div.classList.add("user-message")
    message_status_div.classList.add("message-status")
    message_status_span.classList.add("hour")

    message_status_span.innerText = Date().toString().split(" ")[4].slice(0, -3)
    message_status_div.appendChild(message_status_span)

    svg_img.classList.add("read-confirmation")
    svg_img.src = './images/check-read-svgrepo-com.png'
    svg_img.alt = 'checked message icon'

    message_status_div.appendChild(svg_img)
    
    user_message_div.innerText = text
    user_message_div.appendChild(message_status_div)

    for(button of Array.from(message_field.children))
        button.remove()

    message_field.appendChild(user_message_div)
    next_message_id = next_node_id

    nextMessageCaller()
    if(scroll_flag)
        window.scrollTo(0,999999)
}

async function nextMessageCaller() {
    let message = searchMessage(next_message_id)
    const message_field = document.createElement("div")
    var messages_interval = 4000

    message_field.classList.add("message-field")

    if (message) {
        if (message.type) {
            for(user_button_content of message.content) {
                let button = document.createElement("button")
    
                button.classList.add("user-button") // create the class
                button.innerText = user_button_content.content
                button.setAttribute("next_node_id", user_button_content.next_node_id)

                button.onclick = () => {
                    callNextMessage(parseInt(button.getAttribute("next_node_id")), button.innerText)
                }

                message_field.appendChild(button)
            }
            document.querySelector(".messages-field").appendChild(message_field)
        }
        else { // get and create the messages that the bot will send
            const bot_message_div = document.createElement("div")
            const message_status_div = document.createElement("div")
            const text_message_span = document.createElement("span")
            const message_status_span = document.createElement("span")
            
            next_message_id = message.next_node_id
            bot_message_div.classList.add("bot-message")
            message_status_div.classList.add("message-status")

            message_status_span.innerText = Date().toString().split(" ")[4].slice(0, -3)
            message_status_span.classList.add("hour")
            message_status_div.appendChild(message_status_span)
            
            switch (message.content_type) {
                case 0:
                    text_message_span.innerHTML = createStringMessages(message.content, message.content_type)

                    bot_message_div.appendChild(text_message_span)
                    break;
                case 1:
                    text_message_span.innerHTML = createStringMessages(message.content, message.content_type)
                    bot_message_div.appendChild(text_message_span)

                    bot_message_div.onclick = () => window.open(message.content[1])
                    break;
                case 2:
                    const img = document.createElement('img')
                    img.classList.add("img")
                    
                    img.onload = () => {
                        if(scroll_flag)
                            window.scrollTo(0,999999)
                    }

                    img.src = message.content[0]
                    img.alt = message.content[1]
                    img.style.width = '450px'
                    img.style.height = 'auto'

                    message_status_div.style.float = 'none'
                    message_status_div.style.display = 'flex'
                    message_status_div.style.justifyContent = 'flex-end'

                    message_status_span.classList.add("message-img")

                    message_status_div.style.marginTop = '-35px'
                    message_status_div.style.marginRight = '7px'
                    bot_message_div.style.padding = '10px 11px 22px 11px'
                    bot_message_div.appendChild(img)
        
                    messages_interval = 4000
                    break;
                case 3:
                    const iframe = document.createElement('iframe')
                    
                    iframe.onload = () => {
                        if(scroll_flag)
                            window.scrollTo(0,999999)
                    }
                    iframe.src = message.content[0]

                    message_status_div.style.float = 'none'
                    message_status_div.style.display = 'flex'
                    message_status_div.style.justifyContent = 'flex-end'

                    message_status_div.style.marginTop = '-40px'
                    message_status_div.style.marginRight = '7px'
                    bot_message_div.style.padding = '10px 11px 28px 11px'
                    bot_message_div.appendChild(iframe)
                   
                    messages_interval = 4000
                    break;
                case 4:
                    const audio = document.createElement("audio")
                    const source = document.createElement("source")

                    audio.classList.add("audio-message")
                    audio.controls = " "
                    audio.setAttribute("controlsList", "nodownload")
       
                    source.src = `audios/${message.content[0]}`
                    source.type = "audio/mpeg"

                    audio.appendChild(source)
                    
                    message_status_div.style.float = 'none'
                    message_status_div.style.display = 'flex'
                    message_status_div.style.justifyContent = 'flex-end'

                    message_status_div.style.marginTop = '-30px'
                    message_status_div.style.marginRight = '7px'
                    bot_message_div.style.padding = '7px 7px 15px 5px'
                    bot_message_div.appendChild(audio)
                    messages_interval = 0.7 * message.content[1] * 1000
                    break;  
            }
            bot_message_div.appendChild(message_status_div)
            message_field.appendChild(bot_message_div)
            document.querySelector(".messages-field").appendChild(message_field)
            new_message_sound.play()
            setTimeout(() => {
                nextMessageCaller()
                if(scroll_flag)
                    window.scrollTo(0,999999)
            }, messages_interval)
        }
    }
}

function createScroller() {
    var scroller_element = document.createElement('div')
    const svg_element = document.createElement('svg')
    const field = document.querySelector(".field")

    scroller_element.classList.add('scroller')
    svg_element.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.0006 10.9409L9.53062 8.46979L8.46973 9.53021L12.0006 13.0626L15.5315 9.53021L14.4706 8.46979L12.0006 10.9409Z"
                    fill="#1F2328"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.0006 14.9409L9.53062 12.4698L8.46973 13.5302L12.0006 17.0626L15.5315 13.5302L14.4706 12.4698L12.0006 14.9409Z"
                    fill="#1F2328"></path>
            </g>
        </svg>`
    scroller_element.appendChild(svg_element)
    scroller_element.onclick = () => window.scrollTo(0,999999)
    field.appendChild(scroller_element)
}

window.onscroll = function isContentScrolledToBottom() {
    var scroller_element
    const element = document.documentElement
    const rest = element.scrollHeight - element.scrollTop;
    if(Math.abs(element.clientHeight - rest) > 50) {
        if(scroll_flag)
            createScroller()
        scroll_flag = 0
    }
    else {
        scroll_flag = 1
        scroller_element = document.querySelector('.scroller')
        if(scroller_element !== null)
            scroller_element.remove()
    }
}


window.addEventListener('touchstart', () => {
    if(first_exec){
        new_message_sound.muted = false
        new_message_sound.play()
        new_message_sound.pause()
        first_exec = 0
    }
})


setTimeout(() => {
    nextMessageCaller()
}, 200)

/*
    "messages": [
        {
            "id": number,
            "type": 0 || 1, // 0 bot | 1 user
            "content_type": 0 || 1 || 2 || 3 // 4, // 0 msg | 1 link | 2 img | 3 video | 4 audio
            "content": string or list of strings
            "next_node_id": number
        },
        // type: 1, content: [[list of strings], link]
        // type: 2, content: [img_src, alt]
        // type: 3, content: [video_src]
        // type: 4, content: [audio_src]
        ...
    ]
    [
        {
            "id": 0,
            "type": 0,
            "content_type": 0,
            "content": [[0, "teste message"],
            [1, ", message with strong element"],
            [0, "it is cool to make it like this"],
            [1, "I'm the hold of my own sword!!!!"]],
            "next_node_id": 1
        },
        {
            "id": 1,
            "type": 0,
            "content_type": 0,
            "content": [[1, "ansiedade"],
            [0, "nao pode tomar conta de "],
            [1, "Você!!!!"]],
            "next_node_id": 2
        },
        {
            "id": 2,
            "type": 1,
            "content_type": 0,
            "content": [{
                "content": "Concordo!!!",
                "next_node_id": 3
            },
            {
                "content": "Não entendi.",
                "next_node_id": 29
            }]
        },
        {
            "id": 3,
            "type": 0,
            "content_type": 0,
            "content": [[0, "Então"],
            [1, "venha!"],
            [0, "siga comigo nessa"],
            [1, "nova jornada!!!"]],
            "next_node_id": 4
        },
        {
            "id": 4,
            "type": 0,
            "content_type": 1,
            "content":[[[0, "Conheça pelo nosso website"], [1, "..."]], "https://www.google.com.br"],
            "next_node_id": 5
        },
        {
            "id": 5,
            "type": 0,
            "content_type": 2,
            "content": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDJinZQZdbo5w-2AqH_bkRUdrfcqt078YhVwlIsqckw&s", "olho.jpg"],
            "next_node_id": 6
        },
        {
            "id": 6,
            "type": 0,
            "content_type": 2,
            "content": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-uH_WTG2lXzke2VyHPZOa7E2z8ekIgzPEddcy6aVxQ&s", "firefox_log.jpg"],
            "next_node_id": 7
        },
        {
            "id": 7,
            "type": 0,
            "content_type": 3,
            "content": ["https://www.youtube.com/embed/LfxnFMfK_H8?autoplay=1&controls=0"],
            "next_node_id": -1
        },
        {
            "id": 29,
            "type": 0,
            "content_type": 0,
            "content": [[0, "O"], 
                        [1, "Teste"],
                        [0, "deu"],
                        [1, "certo!!!!"]],
            "next_node_id": 30
        },
        {
            "id": 30,
            "type": 0,
            "content_type": 4,
            "content": ["agua.mp3"]
        }
    ]
*/