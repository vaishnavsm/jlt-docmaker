<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Select data from CSV or Excel file.</p>
            </div>
        </div>
        <div class="container">
            <!-- Styled -->
            <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
            ></b-form-file>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null,
      }
    }
  }

  // access file by file name
</script>