import cv2
import os

print("=============================================")
print("=  热键(请在摄像头的窗口使用)：             =")
print("=  z: 更改类别                              =")
print("=  x: 拍摄图片                              =")
print("=  q: 退出                                  =")
print("=============================================")
print()
class_name = input("请输入类别(如left, right, stop): ")
class_name = "data/" + class_name
if not os.path.exists("data"):
    os.mkdir(data)
if not os.path.exists(class_name):
    os.mkdir(class_name)

index = 1
cap = cv2.VideoCapture(0)
width = 640
height = 480
w = 360
cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)

crop_w_start = (width-w)//2
crop_h_start = (height-w)//2

print(width, height)

while True:
    # get a frame
    ret, frame = cap.read()
    # show a frame
    frame = frame[crop_h_start:crop_h_start+w, crop_w_start:crop_w_start+w]
    frame = cv2.flip(frame,1,dst=None)
    cv2.imshow("capture", frame)

    input_ch = cv2.waitKey(1) & 0xFF

    if input_ch == ord('z'):
        class_name = input("请输入类别(如left, right, stop): ")
        class_name = "data/" + class_name
        if not os.path.exists(class_name):
            os.mkdir(class_name)
        index = 1
    elif input_ch == ord('x'):
        cv2.imwrite("%s/%d.jpeg" % (class_name, index),
                    cv2.resize(frame, (224, 224), interpolation=cv2.INTER_AREA))
        print("%s: %d 张图片" % (class_name, index))
        index += 1
    elif input_ch == ord('q'):
        break

        
cap.release()
cv2.destroyAllWindows()