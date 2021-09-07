// Fetch the data from the form and sends it to the action/controllers

//function which sends the data to the controller action via ajax
//curly brases for block scope
{
    let createPost = function () {
        //#new-post-form is the id of the form from home conrtoller
        let newPostForm = $('#new-post-form');
     
        newPostForm.submit(function(e) {//here e is the event
            e.preventDefault();
            console.log('Inside home_post.js ####################################')

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log('here2')
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
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
                    $(`#post-${data.data.post_id}`).remove();    
                },error: function(error){
                    console.log(error.responceText);
                }
            });

        })
    }

    createPost();
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
                    <input type="hidden" name="post" value="${`post._id`}" >
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