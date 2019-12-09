const repoStatsQuery = `
fragment SearchResultFields on SearchResultItemConnection {
    nodes {
        ... on Repository {
            nameWithOwner
            description
            url
            forkCount
            object(expression: "master") {
                ... on Commit {
                    history {
                        totalCount
                    }
                }
            }
            issues(states: OPEN) {
                totalCount
            }
            pullRequests(states: OPEN) {
                totalCount
            }
            stargazers {
                totalCount
            }
        }
    }
}`

const contributorStatsQuery = `
fragment SearchResultFields on SearchResultItemConnection {
}

`

const searchRepoQuery = (query, quantity, after) => {
  let customAfter = after
  if (after) customAfter = `"${after}"`
  return `{
        search(
            first: ${quantity},
            after: ${customAfter},
            query: "${query}",
            type: REPOSITORY
        ) {
            ...SearchResultFields
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    } ${repoStatsQuery}`
}

export default searchRepoQuery
