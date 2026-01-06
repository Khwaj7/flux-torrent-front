import { File } from "../../types";

interface Props {
    files: File[];
}

export const DetailFiles = (props: Props) => {
    const { files } = props;
    return (
        <div
            className="bg-black/40 rounded-2xl p-6 font-mono text-sm leading-relaxed text-gray-300 border border-white/10 overflow-y-auto max-h-[400px]">
            <p className="text-[var(--primary-accent)] mb-2">General Information</p>
            <p>===================</p>
            {
                files?.map((file) => (
                    <p>Fichier {file.id}: {file.name}{file.extension}</p>
                ))
            }
        </div>
    );
}