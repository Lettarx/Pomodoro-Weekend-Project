let hideTimeout = null;

window.addEventListener('DOMContentLoaded', () => {
    const titlebar = document.getElementById('titlebar');
    const hoverZone = document.getElementById('titlebar-hover-zone');
    console.log("JS cargado");

    hoverZone.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        titlebar.classList.add('show');
    });

    titlebar.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        titlebar.classList.add('show');
    });

    titlebar.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            titlebar.classList.remove('show');
        }, 200);
    });
    hoverZone.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            titlebar.classList.remove('show');
        }, 200);
    });

    document.getElementById('minimize-btn').addEventListener('click', () => {
        window.electronAPI.minimize()
    })

    document.getElementById('close-btn').addEventListener('click', () => {
        window.electronAPI.close()
    })
    document.getElementById('top').addEventListener('click', ()=>{
        window.electronAPI.alwaysOnTopChange()
    })

    //MUSIC SETTINGS

    // const background_music = new Audio('../../sounds/ice-water.mp3')
    // background_music.loop = true
    // background_music.play()

    //POMODORO SETTINGS

    input_work_time = document.getElementById("pomodoro-timer")
    input_rest_time = document.getElementById("break-timer")

    input_work_time.innerHTML = 25
    input_rest_time.innerHTML = 5

    document.getElementById("decrement-pomodoro").addEventListener('click', () => {
        if (parseInt(input_work_time.innerHTML)>1){
            input_work_time.innerHTML = parseInt(input_work_time.innerHTML)-1
        }
    })
    document.getElementById("increment-pomodoro").addEventListener('click', () => {
    if (parseInt(input_work_time.innerHTML)<60){
            input_work_time.innerHTML = parseInt(input_work_time.innerHTML)+1
        }
    })
    document.getElementById("decrement-break").addEventListener('click', () => {
        if (parseInt(input_rest_time.innerHTML)>1){
            input_rest_time.innerHTML = parseInt(input_rest_time.innerHTML)-1
        }
    })
    document.getElementById("increment-break").addEventListener('click', () => {
    if (parseInt(input_rest_time.innerHTML)<60){
            input_rest_time.innerHTML = parseInt(input_rest_time.innerHTML)+1
        }
    })

    
    document.getElementById('btn-iniciar').addEventListener('click',() => {
        window.electronAPI.setTimeWork(parseInt(input_work_time.innerHTML))
        window.electronAPI.setTimeRest(parseInt(input_rest_time.innerHTML))
        window.electronAPI.start()
    })


});


