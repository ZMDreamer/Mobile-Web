/**
 * Created by Administrator on 2090/7/26.
 */

var music=document.querySelector(".music");
music.onclick=function () {
    console.log("1");
    if(this.classList.contains("music_pause")){
        this.classList.remove("music_pause");
        this.classList.add("musiccircle");
    }else{
        this.classList.add("music_pause");
        this.classList.remove("musiccircle");
    }
}