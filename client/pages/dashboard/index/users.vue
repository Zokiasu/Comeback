<template>
  <div class="space-y-5 p-5 px-10">
    <dashboard-user-view
      v-for="(user, index) in users"
      :id="user.id"
      :key="`user_${index}`"
      :name="user.name"
      :email="user.email"
      :role="user.role"
      :picture="user.picture"
      :country="user.country"
      :subscription="user.subscription"
    />
  </div>
</template>

<script>
export default {
  name: 'UsersDashboard',

  layout: 'dashboard',

  async asyncData({ $fire }) {
    const users = await $fire.firestore
      .collection('users')
      .get()
      .then((snapshot) => {
        const userList = []
        snapshot.forEach((doc) => {
          userList.push(doc.data())
        })
        return userList
      })

    return {
      users,
    }
  },
}
</script>