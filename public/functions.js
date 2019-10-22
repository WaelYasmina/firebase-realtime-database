const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/save',
        data: {
            user_id: userId.value,
            first_name: firstName.value,
            last_name: lastName.value,
            age: age.value
        }
    });
});

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'put',
        url: '/update',
        data: {
            user_id: userId.value,
            first_name: firstName.value,
            last_name: lastName.value,
            age: age.value
        }
    });
});

removeBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'delete',
        url: '/remove',
        data: {
            user_id: userId.value
        }
    });
});