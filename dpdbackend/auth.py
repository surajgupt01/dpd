from datetime import datetime, timedelta
from jose import JWTError,  jwt
from passlib.context import CryptContext
from  fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from model import Employee , Manager




SECRET_KEY = "your-secret-key"  # load from .env in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def decode_token(token: str, db: Session) :
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print('payload' , payload.get('sub'))
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
 
        muser  = db.query(Manager).filter(Manager.email == email).first()
        return muser
        
   

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


