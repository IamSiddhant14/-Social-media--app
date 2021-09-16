// Fetch the data from the form and sends it to the action/controllers

//function which sends the data to the controller action via ajax
//curly brases for block scope
{
    let createPost = function () {
        //#new-post-form is the id of the form from home conrtoller
        let newPostForm = $('#new-post-form');
     
        newPostForm.submit(function(e) {//here e is the event
            e.preventDefault();
            console.log('Inside home_post.js ####################')

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log('here2')
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    //Here the newPost has an class inside of it called .delete-post-button
                    deletePost($(' .delete-post-button', newPost))



                }, error: function (error) {
                    console.log(error.responceText);
                }
            });
            // we will be submiting using ajax
            // This convert the form data into json
            // creates a URL encoded text string by serializing form values
        });

    }

    // method to delete a post from the DOM

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                //This will get use the href part of the anchor tag
                url: $(deleteLink).prop('href'),
                success: function(data){
                    //To use ${} we require the uae of `` and for selecting it e are putting it into the form $(`x${ }`)
                    $(`#post-${data.data.post_id}`).remove();    
                },
                error: function(error){
                    console.log(error.responceText);
                }
            });

        })
    }

    


//method to create a post in Dom
let newPostDom = function (post) {

    // let x= 5;
    // `Arpan${x}`
    // output-
    // Arpan5
    //form 2
    //$("")
    // 
    return $(`<!-- _.id or.id does not matter as here we are not comparing -->
    <li id="post-${ post._id}">
        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
                </small>
    
  
    
            ${post.content}
            <br>
            <!--insted of fetch just the id of the user what if we fetch the entire user along with all of its feilds -->
            <!-- we will take the help of mongoose populate for this -->
            <small>
                 ${post.user.name }
            </small>
        </p>
        <div class="post-comments">
          
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add Comment">
                </form>
    

    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
  
                </ul>
            </div>
        </div>
        
    </li>
    
    `)
}

let convertPostsToAjax = function(){

     $("#posts-list-container").each(function(){

        let self = $(this);
        let deleteButton = $(".delete-post-button", self);
        deletePost(deleteButton);

        let postId = self.prop("id").split("-")[1]
        

     })

}

createPost();
convertPostsToAjax();

}

