let banner = document.getElementById("banner"),
    img = banner.getElementsByTagName("img"),
    toggle = document.getElementById("toggle"),
    sound_btn = document.getElementById("sound_btn");

//대상 요소의 정의되어있는 속성값을 불러 올 수 있다
let banner_height = getComputedStyle(banner).height;
let cast = []; //풍선(객체) 배열로 담아둔다

function set_balloon(num) {
    let x = Math.floor(Math.random() * (500 - 10) + 10);
    let y = Math.floor(Math.random() * (400 - 120) + 120);
    size =  Math.floor(Math.random() * (200 - 100) + 100);
    angle = Math.floor(Math.random() * (360 - 0) + 0); 
    speed = Math.random() * (2 - 0) + 0;

    cast[num] = {
        x:x,
        y:-y,
        size:size,
        angle:angle,
        speed:speed
    }
} 

function ball_init() {
    for (let i = 0; i < img.length; i++) {
        set_balloon(i);
        img[i].style.left = "-9999px"; // x 좌표
        img[i].style.top = "-9999px"; // y 좌표
    }
}

function animate_balloon(){
    for(let i = 0; i < img.length; i++){
        img[i].style.left = cast[i].x + 'px';   // x 좌표
        img[i].style.top = cast[i].y + 'px';   // y 좌표
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)'; // 회전
        
        if(cast[i].y < parseInt(banner_height)){
            cast[i].y += 1 + cast[i].speed;            
            cast[i].angle += cast[i].speed;            
        }else{
            set_balloon(i);
        }
    }   

}

function bgm_init() {
    let bgm = new Audio();
    bgm.src = 'images/bgm.mp3';
    bgm.loop = true;
    document.body.appendChild(bgm);
}


//

ball_init();
setInterval(function(){
    animate_balloon();
}, 1000/30);

sound_btn.onclick = function(){
    let attr = sound_btn.getAttribute('class');
    let bgm = document.getElementsByTagName('audio');

    if(attr == 'active'){
        sound_btn.removeAttribute('class');
        sound_btn.setAttribute('src', 'images/sound_off.png');
        bgm[0].pause();
    }else{
        sound_btn.setAttribute('class', 'active');
        sound_btn.setAttribute('src', 'images/sound_on.png');
        bgm[0].play();
    }
}


toggle.onclick = function(){
    let attr = banner.getAttribute('class');
    if(attr == 'active'){
        banner.removeAttribute('class');
        //text로 바꿔주는 역할
        toggle.innerHTML = '배너 열기';
        return false;
    }else{
        banner.setAttribute('class', 'active');
        toggle.innerHTML = '배너 닫기';
        return false;
    }
}


