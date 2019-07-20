const app = Sammy('#sammy-app', function () {
    this.get('', () => {
        this.swap('<h1>Home page</h1>');
    });

    this.get('#/about', () => {
        this.swap('<h1>About page</h1>');
    });
});

$(() => app.run());