<script>
    export let avatar = 'https://cdn.intra.42.fr/users/f1bc7681cd8be9d098d36bb8ac9eb702/jperrama.jpg', name = 'pascal', lastmessage_author = 'Vous', lastmessage_content = 'si c vrai bien vu', lastmessage_hour = '1 h';
</script>

<div class="flex flex-row h-full w-full">
    <div class="w-[21%] h-full flex items-center border border-black">
        <img src={avatar} alt="avatar" class="pl-2 rounded-full" width="70px" height="70px">
    </div>
    <div class="w-[50%] h-full border border-black flex flex-col justify-center">
        <h1>{name}</h1>
        <h1>{lastmessage_author}: {lastmessage_content} . {lastmessage_hour}</h1>
    </div>
    <div class="w-[20%] h-full">

    </div>
</div>
