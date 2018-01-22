#!/bin/bash  
#  
# start function  
PROC_FILE="/tmp/finserverproc"

start() {  
    #check the daemon status first  
    if [ -f $PROC_FILE ]  
    then  
        echo "finserver is already started!"  
        exit 0;  
    else  
        echo "Starting finserver ..."   
        nohup /home/chsun/perFin/server/finserver.js < /dev/null 2>&1 &
        ps aux | grep finserver | grep -v grep | grep -v finserverd.sh | awk '{print $2}' > $PROC_FILE
        exit 0;  
    fi  
}  
  
#stop function  
stop() {  
    echo "Stopping  ..."  
    if [ -f $PROC_FILE ]
    then
      PROC_ID=$(cat  $PROC_FILE)
      kill $PROC_ID
      rm -rf $PROC_FILE  
    else
      echo "PID file doesn't exist. Please make sure the server is running & kill it manually"
      exit 0;  
    fi
}  
  
case "$1" in  
start)  
  start  
  ;;  
stop)  
  stop  
  ;;  
reload|restart)  
  stop  
  start  
  ;;  
status)  
  status $SNAME  
  ;;  
*)  
  echo $"Usage: $0 {start|stop|restart|status}"  
  exit 1  
esac  
