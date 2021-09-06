// Fetch the data from the form and sends it to the action/controllers

//function which sends the data to the controller action via ajax
//curly brases for block scope
{
  let createPost = function(){
      //#new-post-form is the id of the form from home conrtoller
      let newPostForm = $('#new-post-form');

      newPostForm.submit(function(e){
          e.preventDefault();

          $.ajax({
              type:'post',
              url:'/posts/create',
              data: newPostForm.serialize(),
              success: function(data){

                console.log(data);

              },error: function(error){
                  console.log(error.responceText); 
              }
          });
          // we will be submiting using ajax
          // This convert the form data into json
          // creates a URL encoded text string by serializing form values
      });

  }

  createPost();
}

//method to create a post in Dom