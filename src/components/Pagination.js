import { Pagination } from 'semantic-ui-react'

const PaginationTabs = ({ totalPages, setPagPage }) => (
    <Pagination
        totalPages={totalPages}
        boundaryRange={totalPages}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, {activePage})=> setPagPage( activePage - 1 )}
    />
)

export default PaginationTabs;