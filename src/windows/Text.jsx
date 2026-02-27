import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const TxtFile = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>

            <div className="p-5 flex flex-col gap-3">
                {image && <img src={image} alt={name} className="w-full rounded-lg object-cover" />}
                {subtitle && <h3 className="font-semibold text-gray-700">{subtitle}</h3>}
                {description.map((para, i) => (
                    <p key={i} className="text-sm text-gray-600">{para}</p>
                ))}
            </div>
        </>
    );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");

export default TxtFileWindow;
