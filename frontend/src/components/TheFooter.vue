<template>
    <footer>
        <div class="container">
            <router-link class="logo-font" :to="{ name: 'home', params: {} }">
                DocAssist
            </router-link>
            <span class="attribution">
                Techfest submission by team from
        <a rel="noopener noreferrer" target="blank" href="http://iitbhu.ac.in/">IIT-BHU</a>
      </span>
        </div>
    </footer>
</template>

<script>
  export default {
    name: "TheFooter"
  };
</script>