const zone = document.getElementById('zoneEvent');
const container = document.getElementById('zoneContainer');
const message = document.getElementById('infoEvent');
let interaction = null
let interactable = interact('.animatedZone');
let eventAction = {
    isClick: false,
    isDoubleClick: false,
    isRightClick: false,
    isMouseOver: false,
    isMouseOut: false,
    isKeyDown: false,
}



function handleEventClick() {
    console.log('Event 1: Zone click');
    zone.style.backgroundColor = "pink";
    message.innerText = ""
    message.innerText = "Event 1:  click / Drag "
    eventAction = {
        isClick: true,
        isDoubleClick: false,
        isRightClick: false,
        isMouseOver: false,
        isMouseOut: false,
        isKeyDown: false,
    }

}
// Gestionnaire d'événement 1: click
zone.addEventListener('click', handleEventClick);

function handleEventDoubleClick() {
    // zone.removeEventListener('click', handleEventClick);
    console.log(' Event 2: Zone dblclick');
    zone.style.backgroundColor = "yellow";
    message.innerText = ""
    message.innerText = "Event 2: dblclick/ Resize "
    eventAction = {
        isClick: false,
        isDoubleClick: true,
        isRightClick: false,
        isMouseOver: false,
        isMouseOut: false,
        isKeyDown: false,
    }
}
// Gestionnaire d'événement 2: double click
zone.addEventListener('dblclick', handleEventDoubleClick);

function handleEventRightClick() {
    console.log('Event 3: Zone RightClick ');
    zone.style.backgroundColor = "purple";
    message.innerText = ""
    message.innerText = "Event 3: Zone RightClick  / Rebounce"

    eventAction = {
        isClick: false,
        isDoubleClick: false,
        isRightClick: true,
        isMouseOver: false,
        isMouseOut: false,
        isKeyDown: false,
    }
    anime({
        targets: '#zoneEvent',
        translateY: [
            { value: -200, duration: 500, easing: 'easeOutQuad' },
            { value: 0, duration: 800, easing: 'easeOutBounce' }
        ],
        translateX: [
            { value: -window.innerWidth / 2 + 50, duration: 1000, easing: 'easeInOutQuad' },  // Déplacement vers la gauche
            { value: window.innerWidth / 2 - 50, duration: 1000, easing: 'easeInOutQuad' },   // Déplacement vers la droite
            { value: 0, duration: 1000, easing: 'easeInOutQuad' }                            // Retour au centre
        ],
        loop: false
    });
}
// Gestionnaire d'événement 3: Clic droit 
// zone.addEventListener('contextmenu', handleEventRightClick);
zone.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent the default context menu from appearing
    handleEventRightClick()
});

function handleEventMouseOver() {
    if (!eventAction.isDoubleClick && !eventAction.isRightClick) {
        console.log('Event 4: Zone mouseOver',);
        zone.style.backgroundColor = "gray";
        message.innerText = ""
        message.innerText = "Event 4: Zone mouseOver / Rotation"
        eventAction = {
            isClick: false,
            isDoubleClick: false,
            isRightClick: false,
            isMouseOver: true,
            isMouseOut: false,
            isKeyDown: false,
        }
        animation = anime({
            targets: '#zoneEvent',
            scale: [
                { value: 1, duration: 0 }, 
                { value: 0.5, duration: 300, easing: 'easeInOutQuart' }, 
                { value: 1, duration: 300, easing: 'easeInOutQuart' }  
            ],
            translateX: [
                { value: 0, duration: 0 }, 
                { value: 50, duration: 300, easing: 'easeInOutQuart' }, 
                { value: 0, duration: 300, easing: 'easeInOutQuart' }
            ],
            translateY: [
                { value: 0, duration: 0 }, 
                { value: 50, duration: 300, easing: 'easeInOutQuart' }, 
                { value: 0, duration: 300, easing: 'easeInOutQuart' }  
            ],
            rotate: [
                { value: 0, duration: 0 }, 
                { value: 360, duration: 500, easing: 'easeInOutQuart' }, 
                { value: 0, duration: 500, easing: 'easeInOutQuart' }  
            ],
            easing: 'easeInOutQuad',
            loop: false
        });
        setTimeout(function () {
            animation.pause();
        }, 500);
    }
}
// Gestionnaire d'événement 4: mouseover
zone.addEventListener('mouseover', handleEventMouseOver);



function handleEventMouseOut() {

    // console.log("lll", eventAction.isDoubleClick)
    if (!eventAction.isDoubleClick && !eventAction.isRightClick && !eventAction.isMouseOver) {
        console.log('Event 5: Zone mouseout');
        message.innerText = ""
        message.innerText = " Event 5: Zone mouseout / translation à droite"
        zone.style.backgroundColor = "green";
        eventAction = {
            isClick: false,
            isDoubleClick: false,
            isRightClick: false,
            isMouseOver: false,
            isMouseOut: true,
            isKeyDown: false,
        }
        zone.style.transform = 'translateX(500px)';
        setTimeout(function () {
            zone.style.transform = 'translateX(0)';
        }, 500);
       

    }
}
// Gestionnaire d'événement 5: mouseout
zone.addEventListener('mouseout', handleEventMouseOut);

function handleEventKeyDown(key) {
    if (!eventAction.isDoubleClick && !eventAction.isRightClick) {
        console.log('Event 6: Zone KeyDown');
        zone.style.backgroundColor = "red";
        message.innerText = ""
        message.innerText = ` Event 6: Zone KeyDown Touche ${key} pressée`

        eventAction = {
            isClick: false,
            isDoubleClick: false,
            isRightClick: false,
            isMouseOver: false,
            isMouseOut: false,
            isKeyDown: true,
        }

    }
}

// Gestionnaire d'événement 6: keydown
document.addEventListener('keydown', function (event) {
    // console.log(`//Touche ${event.key} pressée`);
    //handleEventKeyDown(event.key)
});



interact('#zoneEvent')
    .draggable({
        
        listeners: {
            start(event) {
               
                console.log("draggable")
            },
            move(event) {
               
                if (eventAction.isClick) {
                    const x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;

                    event.target.style.transform = `translate(${x}px, ${y}px)`;
                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                }
            },
            end(event) {
               
                event.target.style.cursor = 'default';
            }
        }
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            start(event) {
             
                console.log("resize")
            },
            move(event) {
                if (eventAction.isDoubleClick) {
                    let { x, y } = event.target.dataset;

                   
                    event.target.style.width = `${event.rect.width}px`;
                    event.target.style.height = `${event.rect.height}px`;

                  
                    x = (parseFloat(x) || 0) + event.deltaRect.left;
                    y = (parseFloat(y) || 0) + event.deltaRect.top;

                    event.target.style.transform = `translate(${x}px, ${y}px)`;

                    event.target.dataset.x = x;
                    event.target.dataset.y = y;
                }
            }
        }
    })
    .on('mouseover', (event) => {
        
        if (!event.target.style.cursor) {
            event.target.style.cursor = 'default';
        }
    })
    .on('dblclick', (event) => {
       
        console.log("dddd")
        event.target.style.cursor = 'nwse-resize';
    });
///@@@GlowriousMou