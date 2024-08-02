import { useEffect, useRef, useState } from "react"
import { IPosition } from "../interfaces/global.interfaces";
import { BORDER_WIDTH, CENTRAL_INDEX, INITIAL_COLORS, OFFSET } from "../constants/global.constants";
import { listToMatrix, getColorsMatrix } from "../utils/helpers";


export const useColorDropperData = () => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isColorSelected, setIsColorSelected] = useState<boolean>(false);
	const [position, setPosition] = useState<IPosition>({ top: 0, left: 0 });
	const [colors, setColors] = useState<string[][]>(INITIAL_COLORS);
	const [currentColor, setCurrentColor] = useState<string>('');
	const [selectedColor, setSelectedColor] = useState<string>('');

	const sourceImageRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const matrixDataRef = useRef<number[][]>([]);
	const clientRectRef = useRef<DOMRect>();

	const onPickerIconClick = (): void => {
		setIsEnabled(!isEnabled);
	}

	const onSourceImageLoad = (): void => {
		const canvasElement = canvasRef.current as HTMLCanvasElement;
		const sourceImageElement = sourceImageRef.current as HTMLImageElement;

		canvasElement.width = sourceImageElement.width;
		canvasElement.height = sourceImageElement.height;

		const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
		canvasContext.drawImage(sourceImageElement, 0, 0, sourceImageElement.width, sourceImageElement.height);
	}

	useEffect(() => {
		if (canvasRef.current && matrixDataRef.current && isEnabled && clientRectRef.current) {
			const canvasElement: HTMLCanvasElement = canvasRef.current;

			const onMouseMove = (event: MouseEvent) => {
				const { clientX, clientY } = event;
				const {
					top,
					left,
					width,
					height,
				} = clientRectRef.current as DOMRect;

				const widthRatio = canvasElement.width / width || 1;
				const heightRatio = canvasElement.height / height || 1;

				if ((clientX <= left) || (clientY <= top)) {
					setIsVisible(false);
				} else {
					setIsVisible(true);
				}

				setPosition({
					top: clientY - OFFSET / 2 - BORDER_WIDTH * 2 - 10, // 10px is a cell size
					left: clientX - OFFSET / 2 - BORDER_WIDTH * 2 - 10,
				})

				const newColors = getColorsMatrix(
					matrixDataRef.current,
					clientX - left,
					clientY - top,
					widthRatio,
					heightRatio,
				);

				setColors(newColors);
				setCurrentColor(newColors[CENTRAL_INDEX][CENTRAL_INDEX]);
			};

			const onMouseOver = () => {
				setIsVisible(true);
			};

			const onMouseLeave = () => {
				setIsVisible(false);
			};

			const onClick = (): void => {
				setIsColorSelected(true);
				setIsEnabled(false);
				setIsVisible(false);
			};

			canvasElement.addEventListener('click', onClick);
			canvasElement.addEventListener('mousemove', onMouseMove);
			canvasElement.addEventListener('mouseover', onMouseOver);
			canvasElement.addEventListener('mouseleave', onMouseLeave);

			return () => {
				canvasElement.removeEventListener('click', onClick);
				canvasElement.removeEventListener('mousemove', onMouseMove);
				canvasElement.removeEventListener('mouseover', onMouseOver);
				canvasElement.removeEventListener('mouseleave', onMouseLeave);
			};
		}
	}, [canvasRef.current, matrixDataRef.current, isEnabled, clientRectRef.current]);

	useEffect(() => {
		if (canvasRef.current) {
			const canvasElement = canvasRef.current as HTMLCanvasElement;
			const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
			const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height,).data;
			clientRectRef.current = canvasElement.getBoundingClientRect();
			matrixDataRef.current = listToMatrix(imageData, canvasElement.width * 4);
		}
	}, [canvasRef.current]);

	useEffect(() => {
		if (isColorSelected && currentColor) {
			setIsColorSelected(false);
			setSelectedColor(currentColor);
		}
	}, [isColorSelected, currentColor])

	return {
		isEnabled,
		isVisible,
		position,
		colors,
		currentColor,
		selectedColor,
		sourceImageRef,
		canvasRef,
		onPickerIconClick,
		onSourceImageLoad,
	};
}