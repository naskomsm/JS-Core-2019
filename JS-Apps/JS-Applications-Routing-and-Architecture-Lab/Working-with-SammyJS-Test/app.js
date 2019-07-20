const app = Sammy('#sammy-app', function () {
    const handleHome = () => {
        this.swap('<h1>Home page</h1>');
    }

    const handleAbout = () => {
        this.swap('<h1>About page</h1>');
    }

   this.get('',handleHome);
   this.get('#/about',handleAbout);
});

$(() => app.run());