<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
    </head>
    <body>
        <div id="app"></div>
        <script>
            window.STRIPE_PUBLIC_KEY = "{{ env('STRIPE_KEY') }}";
        </script>

        @viteReactRefresh
        @vite(['resources/js/interfaces/App.jsx', 'resources/css/app.css'])
    </body>
</html>
