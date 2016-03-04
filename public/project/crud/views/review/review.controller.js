(function(){
    angular.module("FilmsterAppCrud")
        .controller("ReviewCrudController", ReviewCrudController);

    function ReviewCrudController($scope){
        var reviews = [
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
        $scope.reviews = reviews;
        //event handlers declaration
        $scope.addReview = addReview;
        $scope.removeReview = removeReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;
        $scope.findAllReviews = findAllReviews;

        function addReview(review) {
            $scope.newReview = {
                id: review.id,
                reviewerId: review.reviewerId,
                movieId: review.movieId,
                content: review.content
            };
            $scope.review = {};
            $scope.reviews.push($scope.newReview);

        }

        function removeReview(review) {
            var index = $scope.reviews.indexOf(review);
            if ($scope.review && $scope.review.id && review.id === $scope.review.id) {
                $scope.review = {};
                $scope.selectedReviewIndex = {};
            }
            $scope.reviews.splice(index,1);
        }

        function selectReview(review) {
            $scope.selectedReviewIndex = $scope.reviews.indexOf(review);
            $scope.review={
                id: review.id,
                reviewerId: review.reviewerId,
                movieId: review.movieId,
                content: review.content
            };
        }

        function updateReview(review) {
            if (review && $scope.selectedReviewIndex >= 0) {
                $scope.reviews[$scope.selectedReviewIndex] = {
                    id: review.id,
                    reviewerId: review.reviewerId,
                    movieId: review.movieId,
                    content: review.content
                };
                $scope.review = {};
                $scope.selectedReviewIndex = {};
            }
        }

        function findAllReviews() {
            return $scope.reviews;
        }
    }
})();
