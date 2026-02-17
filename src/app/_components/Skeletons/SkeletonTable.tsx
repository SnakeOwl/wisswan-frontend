import Table from "../tables/Table";
import TableTr from "../tables/TableTr";
import { Skeleton } from "./Skeleton";

export const SkeletonTable = ({
    className,
    rows = 2,
    cols = 2,
}: {
    className?: string
    rows?: number
    cols?: number
}) => (

    <div className={` ${className}`}>
        <table className="w-full">
            <tbody>

                {Array.from({ length: rows }, (v, i) => i).fill(1).map((el, rowIndex) => (
                    <tr key={rowIndex} >
                        {Array.from({ length: cols }, (v, i) => i).map((el, index) => (
                            <td key={index}
                                className="px-2 py-1"
                            >
                                <Skeleton className="min-h-8 rounded-xl" />
                            </td>
                        ))}
                    </tr>
                ))
                }
            </tbody>

        </table>
    </div>

);