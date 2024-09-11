function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [h, s, l];
}

function hslToRgb(h, s, l) {
	let r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function adjustHslColor(h, s, l, hueShift, satAdjust, lightAdjust) {
	// Adjust hue, saturation, and lightness
	h = (h + hueShift) % 1; // hue is circular (0-1)
	s = Math.min(1, Math.max(0, s + satAdjust)); // clamp between 0 and 1
	l = Math.min(1, Math.max(0, l + lightAdjust)); // clamp between 0 and 1
	return [h, s, l];
}

function applyGradientToElement(hueShift, satAdjust, lightAdjust, imageUrl) {
	// Original gradient colors with discrete color steps from your CSS
	const gradientColors = [
		[72, 33, 24], // first gradient color (rgba(72, 33, 24, 0.2))
		[107, 68, 41], // second gradient color
		[141, 103, 58], // third gradient color
		[176, 137, 74], // fourth gradient color
		[210, 172, 91], // fifth gradient color
		[16, 29, 192], // first color of second gradient
		[61, 43, 200], // second color of second gradient
		[107, 57, 208], // third color of second gradient
		[152, 70, 215], // fourth color of second gradient
		[198, 84, 223], // fifth color of second gradient
		[243, 98, 231], // sixth color of second gradient
		[255, 136, 53], // first color of third gradient
		[246, 113, 64], // second color of third gradient
		[236, 89, 75], // third color of third gradient
		[227, 66, 87], // fourth color of third gradient
		[217, 42, 98], // fifth color of third gradient
		[208, 19, 109] // sixth color of third gradient
	];

	// Adjust all colors in the gradient
	let adjustedColors = gradientColors.map(([r, g, b]) => {
		let [h, s, l] = rgbToHsl(r, g, b);
		[h, s, l] = adjustHslColor(h, s, l, hueShift, satAdjust, lightAdjust);
		return hslToRgb(h, s, l);
	});

	// Rebuild the gradient with the adjusted colors in rgba format
	const rgbaGradient = `
        linear-gradient(
            45deg, rgba(${adjustedColors[0].join(
													","
												)}, 0.2) 0%, rgba(${adjustedColors[0].join(
		","
	)}, 0.2) 36%, rgba(${adjustedColors[1].join(
		","
	)}, 0.2) 36%, rgba(${adjustedColors[1].join(
		","
	)}, 0.2) 51%, rgba(${adjustedColors[2].join(
		","
	)}, 0.2) 51%, rgba(${adjustedColors[2].join(
		","
	)}, 0.2) 64%, rgba(${adjustedColors[3].join(
		","
	)}, 0.2) 64%, rgba(${adjustedColors[3].join(
		","
	)}, 0.2) 76%, rgba(${adjustedColors[4].join(
		","
	)}, 0.2) 76%, rgba(${adjustedColors[4].join(",")}, 0.2) 100%
        ),
        linear-gradient(
            135deg, rgba(${adjustedColors[5].join(
													","
												)}, 0.2) 0%, rgba(${adjustedColors[5].join(
		","
	)}, 0.2) 40%, rgba(${adjustedColors[6].join(
		","
	)}, 0.2) 40%, rgba(${adjustedColors[6].join(
		","
	)}, 0.2) 41%, rgba(${adjustedColors[7].join(
		","
	)}, 0.2) 41%, rgba(${adjustedColors[7].join(
		","
	)}, 0.2) 47%, rgba(${adjustedColors[8].join(
		","
	)}, 0.2) 47%, rgba(${adjustedColors[8].join(
		","
	)}, 0.2) 88%, rgba(${adjustedColors[9].join(
		","
	)}, 0.2) 88%, rgba(${adjustedColors[9].join(
		","
	)}, 0.2) 91%, rgba(${adjustedColors[10].join(
		","
	)}, 0.2) 91%, rgba(${adjustedColors[10].join(",")}, 0.2) 100%
        ),
        linear-gradient(
            90deg, rgb(${adjustedColors[11].join(
													","
												)}) 0%, rgb(${adjustedColors[11].join(
		","
	)}) 10%, rgb(${adjustedColors[12].join(
		","
	)}) 10%, rgb(${adjustedColors[12].join(
		","
	)}) 12%, rgb(${adjustedColors[13].join(
		","
	)}) 12%, rgb(${adjustedColors[13].join(
		","
	)}) 24%, rgb(${adjustedColors[14].join(
		","
	)}) 24%, rgb(${adjustedColors[14].join(
		","
	)}) 29%, rgb(${adjustedColors[15].join(
		","
	)}) 29%, rgb(${adjustedColors[15].join(
		","
	)}) 40%, rgb(${adjustedColors[16].join(
		","
	)}) 40%, rgb(${adjustedColors[16].join(",")}) 100%
        )
    `;

	if (imageUrl) {
		const poster = document.querySelector(".poster");
		poster.style.backgroundImage = `url("${imageUrl}")`;
	}

	// Apply the new gradient to the element with the class .lenf-flare
	const element = document.querySelector(".lens-flare");
	if (element) {
		element.style.backgroundImage = rgbaGradient;
	}
}

// Example usage: Shift hue by 0.1 (10% of 360°), reduce saturation by 0.2, increase lightness by 0.1

// Object to store the parameters
const params = {
	qrCodeText: "https://www.toekomstmuziek.com", // Default QR code content
	hueShift: -0.96, // Shift hue by 0.1 (10%)
	satAdjust: -0.3, // Reduce saturation by 0.2
	lightAdjust: -0.05, // Increase lightness by 0.1,
	backgroundSize: "cover", // Background size property
	imageUrl:
		"https://cdn.discordapp.com/attachments/1274364490023964745/1280920297322840117/cube3__photorealistic_super_wide_panoramic_shot_with_analog_fi_403a7903-8375-4ad9-bac5-2a84f9b1c8fd.png?ex=66d9d57d&is=66d883fd&hm=6b1802a3340a182c8c6f734d3f6ba3448818d6398dec059336973c311e789c8f&"
};

// Create the dat.GUI instance
const gui = new dat.GUI();

// Add a text field for the image URL
gui
	.add(params, "imageUrl")
	.onChange(() =>
		applyGradientToElement(
			params.hueShift,
			params.satAdjust,
			params.lightAdjust,
			params.imageUrl
		)
	);

// Initial call to apply the gradient
applyGradientToElement(
	params.hueShift,
	params.satAdjust,
	params.lightAdjust,
	params.imageUrl
);

// Add controls for the parameters
gui
	.add(params, "hueShift", -1, 1)
	.onChange(() =>
		applyGradientToElement(params.hueShift, params.satAdjust, params.lightAdjust)
	);
gui
	.add(params, "satAdjust", -1, 1)
	.onChange(() =>
		applyGradientToElement(params.hueShift, params.satAdjust, params.lightAdjust)
	);
gui
	.add(params, "lightAdjust", -1, 1)
	.onChange(() =>
		applyGradientToElement(params.hueShift, params.satAdjust, params.lightAdjust)
	);

// Initial call to apply the gradient
applyGradientToElement(params.hueShift, params.satAdjust, params.lightAdjust);

// Function to download JSON file
function saveParamsAsJSON() {
	const fileName = prompt("Enter the filename:", "params.json"); // Prompt for filename
	if (fileName) {
		// Only proceed if user provided a filename
		const jsonString = JSON.stringify(params, null, 2); // Convert params to JSON
		const blob = new Blob([jsonString], { type: "application/json" });
		const link = document.createElement("a");

		// Create a download link for the file
		link.href = URL.createObjectURL(blob);
		link.download = fileName.endsWith(".json") ? fileName : `${fileName}.json`; // Ensure .json extension
		link.click(); // Trigger download
	}
}
// Add a "Save" button to the GUI
const saveButton = { save: saveParamsAsJSON };
gui.add(saveButton, "save").name("Save as JSON");

// Function to load JSON file and update the background
function loadParamsFromJSON(event) {
	const file = event.target.files[0]; // Get the selected file
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const loadedParams = JSON.parse(e.target.result); // Parse the JSON file
			// Copy loaded values to the params object
			Object.assign(params, loadedParams);
			// Update the GUI with the new values
			gui.updateDisplay();
			// Reapply the gradient and image after loading the new params
			applyGradientToElement(
				params.hueShift,
				params.satAdjust,
				params.lightAdjust,
				params.imageUrl
			);
		};
		reader.readAsText(file); // Read the file as text
	}
}
// Add a "Load" button functionality
const loadButton = {
	load: function () {
		fileInput.click();
	}
};
gui.add(loadButton, "load").name("Load JSON");

// Create a hidden file input element for loading the file
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "application/json";
fileInput.style.display = "none";
fileInput.addEventListener("change", loadParamsFromJSON); // Add event listener to load the file
document.body.appendChild(fileInput); // Append file input to body

// Add dropdown for background size options
// Add dropdown for background size options and directly update the .poster CSS
gui
	.add(params, "backgroundSize", ["cover", "contain", "auto", "100%", "50%"])
	.name("Background Size")
	.onChange((value) => {
		document.querySelector(".poster").style.backgroundSize = value;
	});

function downloadPosterAsPNG() {
	const posterElement = document.querySelector(".poster");

	htmlToImage
		.toPng(posterElement, { pixelRatio: 2 })
		.then(function (dataUrl) {
			const link = document.createElement("a");
			link.href = dataUrl;
			link.download = "poster.png";
			link.click();
		})
		.catch(function (error) {
			console.error("Error capturing the image:", error);
		});
}
const downloadButton = { download: downloadPosterAsPNG };
gui.add(downloadButton, "download").name("Download Poster");

// Function to create QR Code in the specified container
// Function to create QR Code in the specified container
function generateQRCode(text) {
	const qrcodeContainer = document.getElementById("qrcode");
	qrcodeContainer.innerHTML = ""; // Clear any existing QR code
	new QRCode(qrcodeContainer, {
		text: text,
		width: 150, // Width of the QR code
		height: 150, // Height of the QR code
		colorDark: "#000000", // QR code color
		colorLight: "#ffffff", // Background color
		correctLevel: QRCode.CorrectLevel.H
	});
}

generateQRCode("https://example.com");

// Add input to dat.GUI to modify QR code text
gui
	.add(params, "qrCodeText")
	.name("QR Code Text")
	.onChange(function (value) {
		generateQRCode(value); // Generate QR code when the text is changed
	});

// Ensure QR code is generated for the initial value
generateQRCode(params.qrCodeText);

function captureDivToCanvas() {
  return html2canvas(document.querySelector('.poster'), {
      useCORS: true
  });
}


// Update the .circle-item styles dynamically for multiple items
// Update the .circle-item styles dynamically for multiple items
function updateCircleStyles() {
  const circleItems = document.querySelectorAll('.circle-item'); // Select all circle items

  // Loop through each circle item and apply the styles
  circleItems.forEach(circleItem => {
      // Set opacity
      circleItem.style.opacity = params.circleOpacity;

      // Set border-radius
      circleItem.style.borderRadius = `${params.circleBorderRadius}%`;

      // Set background color or remove background if noBackground is checked
      if (params.noCircleBackground) {
          circleItem.style.backgroundColor = 'transparent';
      } else {
          // Combine background color and opacity using rgba
          const rgbaColor = hexToRgba(params.circleBackgroundColor, params.circleBackgroundOpacity);
          circleItem.style.backgroundColor = rgbaColor;
      }
  });
}


// Add circle-related properties to the params object
Object.assign(params, {
  circleOpacity: 0.8,
  circleBorderRadius: 50, // in percentage
  circleBackgroundColor: '#ffffff', // Default color
  noCircleBackground: true, // Checkbox to remove background
  circleBackgroundOpacity: 1, // Opacity for background color
});

// Function to convert hex color to rgba with opacity
function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
// Create a new "Date Style" folder in the existing dat.GUI interface
const dateStyleFolder = gui.addFolder('Date Style');

// Add opacity slider for the circle
dateStyleFolder.add(params, 'circleOpacity', 0, 1, 0.01).name('Opacity').onChange(updateCircleStyles);

// Add border-radius slider for the circle
dateStyleFolder.add(params, 'circleBorderRadius', 0, 100, 1).name('Border Radius').onChange(updateCircleStyles);

// Add background color picker for the circle
dateStyleFolder.addColor(params, 'circleBackgroundColor').name('Background Color').onChange(updateCircleStyles);

// Add background opacity slider for the circle
dateStyleFolder.add(params, 'circleBackgroundOpacity', 0, 1, 0.01).name('Background Opacity').onChange(updateCircleStyles);

// Add checkbox for no background
dateStyleFolder.add(params, 'noCircleBackground').name('No Background').onChange(updateCircleStyles);

// Initialize the styles on load
updateCircleStyles();

// Add font color control to the params object (for --white variable)
Object.assign(params, {
  whiteFontColor: '#e9e9e9' // Default value for --white variable
});

// Function to update the --white CSS variable
function updateWhiteFontColor() {
  document.documentElement.style.setProperty('--white', params.whiteFontColor);
}

// Add color picker for --white variable to dat.GUI
gui.addColor(params, 'whiteFontColor').name('Font Color').onChange(updateWhiteFontColor);

// Initialize the font color (set --white) on load
updateWhiteFontColor();


// Add initial parameters for .info styles to the params object
Object.assign(params, {
    infoColor: '#e9e9e9',   // Default color (same as --white)
    infoOpacity: 0.8,       // Default opacity for .info
    infoFontSize: 16        // Default font size in pixels
});

// Function to update the .info element styles dynamically
function updateInfoStyles() {
    const infoElement = document.querySelector('.info');
    
    // Set the color
    infoElement.style.color = params.infoColor;

    // Set the opacity
    infoElement.style.opacity = params.infoOpacity;

    // Set the font size
    infoElement.style.fontSize = `${params.infoFontSize}px`;
}

// Create a new "Info Settings" folder in the dat.GUI interface
const infoSettingsFolder = gui.addFolder('Info Settings');

// Add color picker for the .info color
infoSettingsFolder.addColor(params, 'infoColor').name('Text Color').onChange(updateInfoStyles);

// Add opacity slider for the .info opacity
infoSettingsFolder.add(params, 'infoOpacity', 0, 1, 0.01).name('Opacity').onChange(updateInfoStyles);

// Add font size slider for the .info font size
infoSettingsFolder.add(params, 'infoFontSize', 10, 50, 1).name('Font Size').onChange(updateInfoStyles);

// Initialize .info styles on load
updateInfoStyles();