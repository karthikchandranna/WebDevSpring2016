(function(){
    angular.module("FilmsterAppCrud")
        .controller("ReviewCrudController", ReviewCrudController);

    function ReviewCrudController(){
        var vm = this;
        vm.reviews = [
            {id:1000, reviewerId: 111, movieId: 123, content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
            Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit \
            elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia \
            ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."},
            {id:2000, reviewerId: 222, movieId: 456, content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
            Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit \
            elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia \
            ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."},
            {id:3000, reviewerId: 333, movieId: 789, content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
            Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit \
            elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia \
            ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."},
            {id:4000, reviewerId: 333, movieId: 987, content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
            Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit \
            elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia \
            ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna."}
        ];
        //event handlers declaration
        vm.addReview = addReview;
        vm.removeReview = removeReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.findAllReviews = findAllReviews;

        function addReview(review) {
            vm.newReview = {
                id: review.id,
                reviewerId: review.reviewerId,
                movieId: review.movieId,
                content: review.content
            };
            vm.review = {};
            vm.reviews.push(vm.newReview);

        }

        function removeReview(review) {
            var index = vm.reviews.indexOf(review);
            if (vm.review && vm.review.id && review.id === vm.review.id) {
                vm.review = {};
                vm.selectedReviewIndex = {};
            }
            vm.reviews.splice(index,1);
        }

        function selectReview(review) {
            vm.selectedReviewIndex = vm.reviews.indexOf(review);
            vm.review={
                id: review.id,
                reviewerId: review.reviewerId,
                movieId: review.movieId,
                content: review.content
            };
        }

        function updateReview(review) {
            if (review && vm.selectedReviewIndex >= 0) {
                vm.reviews[vm.selectedReviewIndex] = {
                    id: review.id,
                    reviewerId: review.reviewerId,
                    movieId: review.movieId,
                    content: review.content
                };
                vm.review = {};
                vm.selectedReviewIndex = {};
            }
        }

        function findAllReviews() {
            return vm.reviews;
        }
    }
})();
