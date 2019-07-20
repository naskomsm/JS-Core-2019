function solve(){
    const app = Sammy('#main',function(){

    });

    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click',changeText);

    function changeText(){
        document.getElementsByTagName('h1')[0].textContent = 'CHANGED';
    }

    $(() => app.run());
}

solve();