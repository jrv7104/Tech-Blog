async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value
    .trim();
    const content = document.querySelector('input[name="content"]').value.trim;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    
}