import gql from "graphql-tag";


export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            likes{
                username
            }
            comments{
                id body username createdAt
            }
            likeCount
            commentCount
        }
    }
`;