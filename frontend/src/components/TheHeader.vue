<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                DocAssist
            </router-link>
            <ul class="nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'select_data' }">Select Data</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'add_data' }">Add Data</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
  export default {
    name: "TheHeader"
  };
</script>