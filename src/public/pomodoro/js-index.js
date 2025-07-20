window.addEventListener('DOMContentLoaded', () => {
    //TITLEBAR
    const titlebar = document.getElementById('titlebar');
    const hoverZone = document.getElementById('titlebar-hover-zone');

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
    //ANIMATION
    //TIME SETTINGS

    let time_work = null
    window.electronAPI.getTimeWork().then(time => {
        time_work = time
    })
    let time_rest = null
    window.electronAPI.getTimeRest().then(time => {
        time_rest = time
    })

    const text_minutes = document.getElementById("minutero")
    const text_seconds = document.getElementById("secundero")
    const text_title = document.getElementById("title")
    // const log = document.getElementById("log")


    let time_left = time_work * 60
    let nIntervalId = null
    let state = true

    threshold_bottom = time_left - (time_left * 0.334)
    threshold_middle = threshold_bottom - (time_left * 0.334)

    const update_time = () => {
        minutes = Math.floor(time_left / 60)
        seconds = time_left % 60

        if (time_left ===0) {
            
            if (state) {
                time_left = time_work * 60
                text_title.innerHTML = "Tiempo de trabajo"
            } else {
                time_left = time_rest * 60
                text_title.innerHTML = "Tiempo de descanso"
            }
            state = !state
            threshold_bottom = time_left - (time_left * 0.334)
            threshold_middle = threshold_bottom - (time_left * 0.334)
            document.body.style.backgroundImage = "url('../../pomodoro/Anim-Inicio.gif')"

        } else {
            text_minutes.innerHTML = String(minutes).padStart(2,"0")
            text_seconds.innerHTML = String(seconds).padStart(2,"0")

            if (time_left > threshold_bottom){
                document.body.style.backgroundImage = "url('../../pomodoro/Anim-Idle.gif')"
                document.body.style.transition = "background-image 5ms ease"
            } else if (time_left <= threshold_bottom && time_left > threshold_middle){
                document.body.style.backgroundImage = "url('../../pomodoro/Anim-Idle-middle.gif')"
                document.body.style.transition = "background-image 5ms ease"
            } else if (time_left <= threshold_middle){
                document.body.style.backgroundImage = "url('../../pomodoro/Anim-Idle-top.gif')"
                document.body.style.transition = "background-image 5ms ease"
                
            }
            
            time_left--
            // log.innerHTML = time_left
        }
        
    }

    if (!nIntervalId){
        nIntervalId = setInterval(update_time,1000)
    }
    
});