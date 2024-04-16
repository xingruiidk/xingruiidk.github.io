// In customer.js
export class Customer {
    static types = {
        Child: { 
          minOrder: 1,
          maxOrder: 2,
          patience: 10,
          imageSrc: "../image/kid.png",
          imageWidth: 150,
          imageHeight: 200,
          heightOffset : -10
        },
        Youth: {
          minOrder: 1,
          maxOrder: 3,
          patience: 20,
          imageSrc: '../image/youth.png',
          imageWidth: 200,
          imageHeight: 200,
          heightOffset : -10
        },
        WorkingAdult: {
          minOrder: 2,
          maxOrder: 4,
          patience: 25,
          imageSrc: '../image/McServed_WorkingAdults_Draft.png',
          imageWidth: 120,
          imageHeight: 200,
          heightOffset : 0
        },
        FamilyOf3: {
          minOrder: 3,
          maxOrder: 5,
          patience: 30,
          imageSrc: '../image/McServed_FamilyOf3_Draft.png',
          imageWidth: 200,
          imageHeight: 200,
          heightOffset : 0
        },
        DeliveryDriver: {
          minOrder: 4,
          maxOrder: 6,
          patience: 10,
          imageSrc: '../image/McServed_DeliveryDriver_Draft.png',
          imageWidth: 200,
          imageHeight: 200,
          heightOffset : 0
        }
      };

    constructor(type) {
        const { minOrder, maxOrder, patience, imageSrc, imageWidth, imageHeight, heightOffset } = Customer.types[type];
        this.type = type;
        this.patience = patience;
        this.orderSize = Math.floor(Math.random() * (maxOrder - minOrder + 1)) + minOrder;
        this.orderItems = [];
        this.imageSrc = imageSrc;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.heightOffset = heightOffset;
        this.image = new Image();
    
        if (this.imageSrc) {
            this.image.src = this.imageSrc;
            this.image.onload = () => console.log(`${this.type} image loaded successfully.`);
            this.image.onerror = () => {
                console.error(`Failed to load ${this.type} image.`);
                this.image = null; // Handle the error by setting the image to null
            };
        }
    }
    

    generateOrder(items) {
        for (let i = 0; i < this.orderSize; i++) {
            this.orderItems.push(items[Math.floor(Math.random() * items.length)]);
        }
    }
}
