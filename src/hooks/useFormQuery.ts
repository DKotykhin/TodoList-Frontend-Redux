import { useEffect, useState, useMemo } from "react";

import { useAppSelector } from "store/hook";
import { selectQuery } from "store/selectors";

import { IQueryData } from "types/taskTypes";

interface IFormQuery {
    totalTasks: string;
    currentPageNumber: number;
    tabIndex: number;
    searchQuery: string;
    fieldData: string;
    AZData: string;
}

export const useFormQuery = ({
    totalTasks,
    currentPageNumber,
    tabIndex,
    searchQuery,
    fieldData,
    AZData,
}: IFormQuery): IQueryData => {
    const {
        query: { sortField, sortOrder },
    } = useAppSelector(selectQuery);
    const [sortParams, setSortParams] = useState({ sortField, sortOrder });

    useEffect(() => {
        switch (fieldData) {
            case "created":
                setSortParams({
                    sortField: "createdAt",
                    sortOrder: AZData === "A-z" ? -1 : 1,
                });
                break;
            case "deadline":
                setSortParams({
                    sortField: "deadline",
                    sortOrder: AZData === "A-z" ? 1 : -1,
                });
                break;
            case "title":
                setSortParams({
                    sortField: "title",
                    sortOrder: AZData === "A-z" ? 1 : -1,
                });
                break;
            default:
                setSortParams({ sortField: "createdAt", sortOrder: -1 });
                break;
        }
    }, [fieldData, AZData]);

    const query: IQueryData = useMemo(
        () => ({
            limit: totalTasks,
            page: currentPageNumber,
            tabKey: tabIndex,
            sortField: sortParams.sortField,
            sortOrder: sortParams.sortOrder,
            search: searchQuery,
        }),
        [
            currentPageNumber,
            searchQuery,
            sortParams.sortField,
            sortParams.sortOrder,
            tabIndex,
            totalTasks,
        ]
    );

    return query;
};
